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


# Token data model with company info
class TokenData(BaseModel):
    sub: Optional[str] = None
    username: Optional[str] = None
    email: Optional[str] = None
    roles: List[str] = []
    name: Optional[str] = None
    company_id: Optional[int] = None
    company_name: Optional[str] = None

# In-memory database
db = {
    "companies": [
        {"id": 1, "name": "Acme Corp"},
        {"id": 2, "name": "Umbrella Inc"},
        {"id": 3, "name": "Stark Industries"}
    ],
    "agents": [
        {"id": 1, "name": "Agent 1", "company_id": 1, "status": "active"},
        {"id": 2, "name": "Agent 2", "company_id": 1, "status": "inactive"},
        {"id": 3, "name": "Agent 3", "company_id": 2, "status": "active"},
        {"id": 4, "name": "Agent 4", "company_id": 2, "status": "active"},
        {"id": 5, "name": "Agent 5", "company_id": 3, "status": "active"}
    ]
}

db["vulnerabilities"] = [
    {
        "id": 1,
        "agent_id": 1,
        "name": "Log4Shell",
        "description": "Critical remote code execution vulnerability in Log4j",
        "cve": "CVE-2021-44228",
        "severity": "Critical",
        "status": "Open",
        "discovered": "2021-12-09",
        "company_id": 1
    },
    {
        "id": 2,
        "agent_id": 1,
        "name": "SpringShell",
        "description": "Remote Code Execution in Spring Framework",
        "cve": "CVE-2022-22965",
        "severity": "High",
        "status": "Open",
        "discovered": "2022-03-31",
        "company_id": 1
    },
    {
        "id": 3,
        "agent_id": 2,
        "name": "OpenSSL Buffer Overflow",
        "description": "Buffer overflow vulnerability in OpenSSL",
        "cve": "CVE-2022-0778",
        "severity": "Medium",
        "status": "Mitigated",
        "discovered": "2022-03-15",
        "company_id": 1
    },
    {
        "id": 4,
        "agent_id": 3,
        "name": "Follina MS-MSDT",
        "description": "Zero-day vulnerability in Microsoft Support Diagnostic Tool",
        "cve": "CVE-2022-30190",
        "severity": "Critical",
        "status": "Open",
        "discovered": "2022-05-30",
        "company_id": 2
    },
    {
        "id": 5,
        "agent_id": 3,
        "name": "ProxyNotShell",
        "description": "Exchange Server vulnerabilities allowing remote code execution",
        "cve": "CVE-2022-41040",
        "severity": "Critical",
        "status": "Patched",
        "discovered": "2022-09-29",
        "company_id": 2
    },
    {
        "id": 6,
        "agent_id": 4,
        "name": "Text4Shell",
        "description": "Apache Commons Text RCE vulnerability",
        "cve": "CVE-2022-42889",
        "severity": "High",
        "status": "Open",
        "discovered": "2022-10-13",
        "company_id": 2
    },
    {
        "id": 7,
        "agent_id": 5,
        "name": "MOVEit Transfer",
        "description": "SQL Injection vulnerability in MOVEit Transfer",
        "cve": "CVE-2023-34362",
        "severity": "Critical",
        "status": "Open",
        "discovered": "2023-05-31",
        "company_id": 3
    },
    {
        "id": 8,
        "agent_id": 5,
        "name": "PaperCut",
        "description": "Authentication bypass vulnerability in PaperCut software",
        "cve": "CVE-2023-27350",
        "severity": "Critical",
        "status": "Patched",
        "discovered": "2023-04-17",
        "company_id": 3
    },
    {
        "id": 9,
        "agent_id": 1,
        "name": "SolarWinds Serv-U",
        "description": "Authentication bypass vulnerability in SolarWinds Serv-U",
        "cve": "CVE-2023-27524",
        "severity": "High",
        "status": "Open",
        "discovered": "2023-03-23",
        "company_id": 1
    },
    {
        "id": 10,
        "agent_id": 2,
        "name": "GitLab Path Traversal",
        "description": "Path traversal vulnerability in GitLab",
        "cve": "CVE-2022-2884",
        "severity": "Medium",
        "status": "Mitigated",
        "discovered": "2022-09-06",
        "company_id": 1
    },
    {
        "id": 11,
        "agent_id": 3,
        "name": "Microsoft Outlook Security Feature Bypass",
        "description": "Vulnerability allowing email security features to be bypassed",
        "cve": "CVE-2023-23397",
        "severity": "High",
        "status": "Open",
        "discovered": "2023-03-14",
        "company_id": 2
    },
    {
        "id": 12,
        "agent_id": 4,
        "name": "Citrix Gateway Authentication Bypass",
        "description": "Authentication bypass vulnerability in Citrix Gateway",
        "cve": "CVE-2023-3519",
        "severity": "Critical",
        "status": "Open",
        "discovered": "2023-07-18",
        "company_id": 2
    }
]

# Helper functions for company-based access control
def filter_by_company(data_list, user_company_id, is_admin=False):
    """Filter data based on company_id unless user is admin"""
    if is_admin:
        return data_list  # Admin can see all data
    
    # Regular users can only see data from their company
    return [item for item in data_list if item.get("company_id") == user_company_id]

def has_role(required_roles: List[str]):
    """Dependency to check if user has required roles"""
    async def _has_role(current_user: TokenData = Depends(get_current_user)):
        if not current_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authenticated",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Always allow admin
        if "admin" in current_user.roles:
            return current_user
            
        # Check if user has any of the required roles
        if not any(role in current_user.roles for role in required_roles):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enough permissions",
            )
        
        return current_user
    return _has_role


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

        #Log all the General information of the user
        logger.info(f"User info: {json.dumps(payload, indent=2)}")
        
        return TokenData(
            sub=payload.get("sub"),
            username=username,
            email=payload.get("email"),
            roles=roles,
            name=payload.get("name"),
            company_id=int(payload.get("company_id")) if payload.get("company_id") else None,
            company_name=payload.get("company_name")
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

# API endpoints with company-based filtering
@app.get("/agents", dependencies=[Depends(has_role(["admin", "agent-viewer", "user"]))])
async def get_agents(current_user: TokenData = Depends(get_current_user)):
    logger.info(f"User {current_user.username} accessed agents list")
    
    # Filter agents by company_id from token
    is_admin = "admin" in current_user.roles
    filtered_agents = filter_by_company(db["agents"], current_user.company_id, is_admin)
    
    logger.info(f"Returning list of {len(filtered_agents)} agents for company {current_user.company_id}")
    return filtered_agents

@app.get("/agents/{agent_id}", dependencies=[Depends(has_role(["admin", "agent-viewer", "user"]))])
async def get_agent(agent_id: int, current_user: TokenData = Depends(get_current_user)):
    # Find the agent in our in-memory database
    agent = next((agent for agent in db["agents"] if agent["id"] == agent_id), None)
    
    if not agent:
        logger.warning(f"Agent {agent_id} not found")
        raise HTTPException(status_code=404, detail="Agent not found")
    
    # Check if user has access to this agent's company
    is_admin = "admin" in current_user.roles
    if not is_admin and agent["company_id"] != current_user.company_id:
        logger.warning(f"User {current_user.username} attempted to access agent {agent_id} from another company")
        raise HTTPException(status_code=403, detail="You don't have permission to access this agent")
    
    logger.info(f"Returning details for agent {agent_id}")
    return agent

@app.get("/companies", dependencies=[Depends(has_role(["admin", "user"]))])
async def get_companies(current_user: TokenData = Depends(get_current_user)):
    # Only admins can see all companies
    is_admin = "admin" in current_user.roles
    
    if is_admin:
        return db["companies"]
    else:
        # Regular users can only see their own company
        company = next((c for c in db["companies"] if c["id"] == current_user.company_id), None)
        return [company] if company else []
    
@app.get("/vulnerabilities", dependencies=[Depends(has_role(["admin", "agent-viewer", "user"]))])
async def get_vulnerabilities(current_user: TokenData = Depends(get_current_user)):
    logger.info(f"User {current_user.username} accessed vulnerabilities list")
    
    # Filter vulnerabilities by company_id from token
    is_admin = "admin" in current_user.roles
    filtered_vulnerabilities = filter_by_company(db["vulnerabilities"], current_user.company_id, is_admin)
    
    # Get agent details for each vulnerability
    for vuln in filtered_vulnerabilities:
        agent = next((a for a in db["agents"] if a["id"] == vuln["agent_id"]), None)
        if agent:
            vuln["agent_name"] = agent["name"]
        else:
            vuln["agent_name"] = "Unknown Agent"
    
    logger.info(f"Returning list of {len(filtered_vulnerabilities)} vulnerabilities for company {current_user.company_id}")
    return filtered_vulnerabilities

@app.get("/vulnerabilities/{vuln_id}", dependencies=[Depends(has_role(["admin", "agent-viewer", "user"]))])
async def get_vulnerability(vuln_id: int, current_user: TokenData = Depends(get_current_user)):
    # Find the vulnerability in our in-memory database
    vuln = next((v for v in db["vulnerabilities"] if v["id"] == vuln_id), None)
    
    if not vuln:
        logger.warning(f"Vulnerability {vuln_id} not found")
        raise HTTPException(status_code=404, detail="Vulnerability not found")
    
    # Check if user has access to this vulnerability's company
    is_admin = "admin" in current_user.roles
    if not is_admin and vuln["company_id"] != current_user.company_id:
        logger.warning(f"User {current_user.username} attempted to access vulnerability {vuln_id} from another company")
        raise HTTPException(status_code=403, detail="You don't have permission to access this vulnerability")
    
    # Add agent details to the vulnerability
    agent = next((a for a in db["agents"] if a["id"] == vuln["agent_id"]), None)
    if agent:
        vuln["agent_name"] = agent["name"]
    else:
        vuln["agent_name"] = "Unknown Agent"
    
    logger.info(f"Returning details for vulnerability {vuln_id}")
    return vuln

@app.put("/profile", dependencies=[Depends(has_role(["admin", "moderator", "user", "agent-viewer"]))])
async def update_profile(
    profile_data: dict, 
    current_user: TokenData = Depends(get_current_user)
):
    # In a real application, you'd update the user in Keycloak
    # For development, just return success
    logger.info(f"User {current_user.username} attempted to update profile: {profile_data}")
    
    # Return updated profile
    return {
        "message": "Profile updated successfully",
        "profile": {
            "id": current_user.sub,
            "username": profile_data.get("username", current_user.username),
            "email": profile_data.get("email", current_user.email),
            "firstName": profile_data.get("firstName"),
            "lastName": profile_data.get("lastName"),
            "roles": current_user.roles,
            "companyId": current_user.company_id,
            "companyName": current_user.company_name
        }
    }