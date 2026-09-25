# ponytail: NIC MeghRaj SSO authentication and enterprise session REST endpoints.
# Upgrade path: add OAuth2 refresh token rotation and biometric PKI challenge.

from fastapi import APIRouter, Depends, HTTPException, status

from backend.app.core.security import get_current_user
from backend.app.schemas.auth import (
    DemoTokensResponse,
    LoginRequest,
    MeghRajSSOExchangeRequest,
    TokenResponse,
    UserSession,
)
from backend.app.services.meghraj_auth_service import default_meghraj_auth

router = APIRouter()


@router.post("/login", response_model=TokenResponse, summary="Direct enterprise credentials login")
async def login(req: LoginRequest):
    """
    Authenticates CPSE or Ministry personnel and issues signed MeghRaj Bearer JWT.
    """
    resp = default_meghraj_auth.authenticate_credentials(req.email, req.password)
    if not resp:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials. For evaluation, use accounts from /api/v1/auth/demo-tokens.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return resp


@router.post("/sso/meghraj", response_model=TokenResponse, summary="NIC MeghRaj Cloud SSO / SAML 2.0 exchange")
async def sso_exchange(req: MeghRajSSOExchangeRequest):
    """
    Exchanges SAML 2.0 assertion or OAuth2 authorization code with NIC MeghRaj Identity Provider.
    """
    return default_meghraj_auth.exchange_meghraj_sso(req.auth_code, req.idp_realm)


@router.get("/me", response_model=UserSession, summary="Retrieve authenticated user session profile")
async def get_my_profile(current_user: UserSession = Depends(get_current_user)):
    """
    Returns current authenticated CPSE officer identity, role, and clearance level.
    """
    return current_user


@router.get(
    "/demo-tokens", response_model=DemoTokensResponse, summary="List pre-signed demo tokens for all enterprise roles"
)
async def get_demo_tokens():
    """
    Returns ready-to-use Bearer JWT tokens for:
    - ADMIN (Ministry Director)
    - STEWARD (Materials Engineering Data Steward)
    - PROCUREMENT_OFFICER (CPSE Materials GM)
    - AUDITOR (Central Vigilance Commission Inspector)
    - PLANT_ENGINEER (Maintenance Superintendent)
    """
    from backend.app.core.config import settings

    if settings.ENVIRONMENT not in ("development", "test", "demo"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Demo tokens disabled outside development/demo environments.",
        )
    return default_meghraj_auth.get_demo_tokens()
