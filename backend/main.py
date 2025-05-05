from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from jose.utils import base64url_decode
from cryptography.hazmat.primitives.asymmetric.rsa import RSAPublicNumbers
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from loguru import logger
from pydantic import BaseModel
from typing import List, Optional, Union
import json
import base64
import requests
from functools import lru_cache

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

# OAuth2 scheme for JWT token extraction
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)

# Configuration for Keycloak
KEYCLOAK_URL = "http://localhost:8080"
KEYCLOAK_REALM = "pinx-dashboard"
KEYCLOAK_CLIENT_ID = "pinx-backend"
ALGORITHM = "RS256"
KEYCLOAK_CLIENT_SECRET = "sWw8oqnA3niTzqgi30LXqcAj7wfjf0HR"


# Models for auth
class TokenData(BaseModel):
    sub: Optional[str] = None
    username: Optional[str] = None
    email: Optional[str] = None
    roles: List[str] = []
    name: Optional[str] = None


# Cache for public key to avoid fetching it on every request
# Update the get_keycloak_public_key function

@lru_cache()
def get_keycloak_public_key():
    try:
        # Go directly to the JWKS endpoint
        jwks_url = f"{KEYCLOAK_URL}/realms/{KEYCLOAK_REALM}/protocol/openid-connect/certs"
        logger.info(f"Fetching JWKS from {jwks_url}")
        jwks = requests.get(jwks_url).json()
        
        # Find the signing key (RS256)
        signing_key = None
        for key in jwks["keys"]:
            if key["alg"] == "RS256" and key["use"] == "sig":
                signing_key = key
                break
                
        if not signing_key:
            raise Exception("No RS256 signing key found in JWKS")
            
        # Create a PEM certificate from the X.509 certificate chain
        cert = f"-----BEGIN CERTIFICATE-----\n{signing_key['x5c'][0]}\n-----END CERTIFICATE-----"
        
        return cert
    except Exception as e:
        logger.error(f"Failed to get Keycloak public key: {e}")
        raise

# Authentication dependency
async def get_current_user(token: Optional[str] = Depends(oauth2_scheme)) -> TokenData:
    if not token:
        return TokenData()  # Return empty user data if no token provided
        
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decode JWT token without verification to extract header
        header_data = jwt.get_unverified_header(token)
        
        # Get public key for verifying
        public_key = get_keycloak_public_key()
        
        # Decode the token with verification but DISABLE audience validation
        payload = jwt.decode(
            token,
            public_key,
            algorithms=[ALGORITHM],
            options={"verify_aud": False}  # Disable audience verification
        )
        
        username: str = payload.get("preferred_username")
        if username is None:
            raise credentials_exception
        
        # Extract roles from realm_access with enhanced logging
        realm_access = payload.get("realm_access", {})
        roles = realm_access.get("roles", [])
        logger.info(f"User {username} has roles: {roles}")
        
        return TokenData(
            sub=payload.get("sub"),
            username=username,
            email=payload.get("email"),
            roles=roles,
            name=payload.get("name")
        )
    except JWTError as e:
        logger.error(f"JWT error: {str(e)}")
        raise credentials_exception
    except Exception as e:
        logger.error(f"Authentication error: {str(e)}")
        raise credentials_exception


# Role-based access control dependency
def has_role(required_roles: Union[str, List[str]]):
    if isinstance(required_roles, str):
        required_roles = [required_roles]
    
    async def role_checker(current_user: TokenData = Depends(get_current_user)):
        if not current_user.sub:  # No authenticated user
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication required"
            )
            
        # Check if user has any of the required roles
        logger.info(f"Checking if user {current_user.username} with roles {current_user.roles} has any of the required roles: {required_roles}")
        
        for role in required_roles:
            if role in current_user.roles:
                logger.info(f"Role {role} found in user roles")
                return current_user
                
        logger.warning(f"User {current_user.username} with roles {current_user.roles} does not have any of the required roles: {required_roles}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Insufficient permissions. Required roles: {required_roles}"
        )
        
    return role_checker


# Debug endpoint to see token contents
@app.get("/debug-token")
async def debug_token(token: Optional[str] = Depends(oauth2_scheme)):
    if not token:
        return {"message": "No token provided"}
    
    try:
        # Decode without verification to see what's in the token
        unverified = jwt.decode(token, options={"verify_signature": False})
        return {
            "token_info": unverified,
            "roles": unverified.get("realm_access", {}).get("roles", []),
            "audience": unverified.get("aud", "No audience")
        }
    except Exception as e:
        return {"error": str(e)}


# Routes
@app.get("/hello")
async def hello(name: str = None, current_user: TokenData = Depends(get_current_user)):
    if name:
        logger.info(f"Hello {name}")
        return {"message": f"FastAPI says hello to {name} 👋"}
    else:
        logger.info("Hello anonymous")
        return {"message": "FastAPI says hello 👋"}


@app.get("/agents", dependencies=[Depends(has_role(["user", "admin", "agent-viewer"]))])
async def get_agents(current_user: TokenData = Depends(get_current_user)):
    logger.info(f"User {current_user.username} accessed agents list")
    agents = [
        {"id": 1, "name": "Agent 1"},
        {"id": 2, "name": "Agent 2"},
        {"id": 3, "name": "Agent 3"},
    ]
    logger.info("Returning list of agents")
    return agents


@app.get("/agents/{agent_id}", dependencies=[Depends(has_role(["admin", "agent-viewer"]))])
async def get_agent(agent_id: int, current_user: TokenData = Depends(get_current_user)):
    logger.info(f"User {current_user.username} accessing agent {agent_id}")
    agents = [
        {"id": 1, "name": "Agent 1"},
        {"id": 2, "name": "Agent 2"},
        {"id": 3, "name": "Agent 3"},
    ]
    agent = next((agent for agent in agents if agent["id"] == agent_id), None)
    if agent:
        logger.info(f"Returning details for agent {agent_id}")
        return agent
    else:
        logger.warning(f"Agent {agent_id} not found")
        raise HTTPException(status_code=404, detail="Agent not found")