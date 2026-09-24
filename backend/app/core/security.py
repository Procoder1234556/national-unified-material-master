# ponytail: Lightweight FastAPI RBAC route guard dependencies and Bearer token resolver.
# Upgrade path: add OAuth2 scope-based granular attribute permissions.

from typing import List, Optional

from fastapi import Depends, HTTPException, Security, status, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from backend.app.schemas.auth import UserSession
from backend.app.services.meghraj_auth_service import default_meghraj_auth

bearer_scheme = HTTPBearer(auto_error=False)


async def get_current_user(
    request: Request,
    credentials: Optional[HTTPAuthorizationCredentials] = Security(bearer_scheme),
) -> UserSession:
    """
    Validates Bearer token from MeghRaj Gov Cloud or returns authenticated UserSession.
    """
    token = None
    if credentials and credentials.credentials:
        token = credentials.credentials
    elif request.query_params.get("token"):
        token = request.query_params.get("token")

    if not token:
        # Check if running in open evaluation mode or missing token
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Bearer authentication token. Please login via NIC MeghRaj SSO.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = default_meghraj_auth.verify_and_decode_jwt(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired MeghRaj SSO session token.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return UserSession(
        email=payload.get("email", payload.get("sub", "unknown@numm.gov.in")),
        full_name=payload.get("name", "CPSE Officer"),
        role=payload.get("role", "STEWARD"),
        organization_code=payload.get("org", "IOCL"),
        plant_code=payload.get("plant"),
        clearance_level=payload.get("clearance", "CONFIDENTIAL"),
    )


async def get_optional_user(
    request: Request,
    credentials: Optional[HTTPAuthorizationCredentials] = Security(bearer_scheme),
) -> Optional[UserSession]:
    """Extracts user if token present; returns None if anonymous."""
    token = None
    if credentials and credentials.credentials:
        token = credentials.credentials
    elif request.query_params.get("token"):
        token = request.query_params.get("token")
        
    if not token:
        return None
        
    try:
        return await get_current_user(request, credentials)
    except HTTPException:
        return None


def require_roles(allowed_roles: List[str]):
    """
    Role-Based Access Control (RBAC) dependency factory.
    Verifies caller possesses one of the authorized enterprise roles.
    """

    async def _role_checker(user: UserSession = Depends(get_current_user)) -> UserSession:
        if user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. User role '{user.role}' is not authorized. Required: {allowed_roles}",
            )
        return user

    return _role_checker


# Convenient role guards
require_steward = require_roles(["STEWARD", "ADMIN"])
require_procurement = require_roles(["PROCUREMENT_OFFICER", "ADMIN"])
require_auditor = require_roles(["AUDITOR", "ADMIN"])
require_admin = require_roles(["ADMIN"])
