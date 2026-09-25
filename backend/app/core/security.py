# ponytail: Lightweight FastAPI RBAC route guard dependencies and Bearer token resolver.
# Upgrade path: add OAuth2 scope-based granular attribute permissions.

from typing import List, Optional

from fastapi import Depends, HTTPException, Security, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from backend.app.schemas.auth import UserSession
from backend.app.services.meghraj_auth_service import default_meghraj_auth

# Auto-error False allows the dependency function to handle missing headers and return mock in dev
bearer_scheme = HTTPBearer(auto_error=False)


async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Security(bearer_scheme),
) -> UserSession:
    """
    Validates Bearer token from MeghRaj Gov Cloud or returns authenticated UserSession.
    """
    if not credentials or not credentials.credentials:
        from backend.app.core.config import settings

        if settings.ENVIRONMENT == "development":
            return UserSession(
                email="dev@numm.gov.in",
                full_name="Dev User",
                role="STEWARD",
                organization_code="IOCL",
                plant_code="1001",
                clearance_level="CONFIDENTIAL",
            )
        # Check if running in open evaluation mode or missing token
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Bearer authentication token. Please login via NIC MeghRaj SSO.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = credentials.credentials
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
    credentials: Optional[HTTPAuthorizationCredentials] = Security(bearer_scheme),
) -> Optional[UserSession]:
    """Extracts user if token present; returns None if anonymous."""
    if not credentials or not credentials.credentials:
        return None
    try:
        return await get_current_user(credentials)
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


# Convenient role guards (PLANT_ENGINEER shares procurement/surplus mutations)
require_steward = require_roles(["STEWARD", "ADMIN"])
require_procurement = require_roles(["PROCUREMENT_OFFICER", "PLANT_ENGINEER", "ADMIN"])
require_auditor = require_roles(["AUDITOR", "ADMIN"])
require_admin = require_roles(["ADMIN"])
require_ingest = require_roles(["STEWARD", "ADMIN", "PROCUREMENT_OFFICER"])
