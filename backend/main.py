from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
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
KEYCLOAK_URL = "http://localhost:8080/auth"
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
@lru_cache()
def get_keycloak_public_key():
    try:
        well_known_url = f"{KEYCLOAK_URL}/realms/{KEYCLOAK_REALM}/.well-known/openid-configuration"
        well_known = requests.get(well_known_url).json()
        
        jwks_uri = well_known["jwks_uri"]
        jwks = requests.get(jwks_uri).json()
        
        # Get the RSA public key for RS256
        for key in jwks["keys"]:
            if key["alg"] == ALGORITHM and key["use"] == "sig":
                n = key["n"]
                e = key["e"]
                
                # Convert modulus (n) and exponent (e) to PEM format
                modulus = int.from_bytes(base64.urlsafe_b64decode(n + "=" * ((4 - len(n) % 4) % 4)), byteorder="big")
                exponent = int.from_bytes(base64.urlsafe_b64decode(e + "=" * ((4 - len(e) % 4) % 4)), byteorder="big")
                
                # Form the PEM key
                key_in_pem_format = f"-----BEGIN PUBLIC KEY-----\n{base64.b64encode(modulus.to_bytes((modulus.bit_length() + 7) // 8, byteorder='big')).decode()}\n-----END PUBLIC KEY-----"
                return key_in_pem_format
                
        raise Exception("No suitable public key found")
    except Exception as e:
        logger.error(f"Failed to get Keycloak public key: {str(e)}")
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
        
        # Decode the token with verification
        payload = jwt.decode(
            token,
            get_keycloak_public_key(),
            algorithms=[ALGORITHM],
            audience=KEYCLOAK_CLIENT_ID
        )
        
        username: str = payload.get("preferred_username")
        if username is None:
            raise credentials_exception
        
        # Extract roles from realm_access
        realm_access = payload.get("realm_access", {})
        roles = realm_access.get("roles", [])
        
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
        for role in required_roles:
            if role in current_user.roles:
                return current_user
                
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Insufficient permissions. Required roles: {required_roles}"
        )
        
    return role_checker


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