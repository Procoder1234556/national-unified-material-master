# ponytail: Minimal Pydantic schemas for NIC MeghRaj SSO authentication and RBAC.
# Upgrade path: add multi-factor FIDO2 / WebAuthn token payloads.

from typing import List, Optional

from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    email: str = Field(..., description="Enterprise CPSE or NIC email address")
    password: str = Field(..., description="Account password or CPSE portal PIN")


class MeghRajSSOExchangeRequest(BaseModel):
    auth_code: str = Field(..., description="SAML 2.0 assertion artifact or OAuth2 authorization code")
    idp_realm: str = Field("nic-meghraj-gov", description="MeghRaj Gov Cloud identity provider realm")
    client_id: Optional[str] = Field("numm-sovereign-portal", description="Registered client identifier")


class UserSession(BaseModel):
    email: str
    full_name: str
    role: str = Field(..., description="STEWARD | PROCUREMENT_OFFICER | ADMIN | AUDITOR")
    organization_code: str = Field(..., description="IOCL | ONGC | BPCL | HPCL | GAIL | OIL")
    plant_code: Optional[str] = None
    clearance_level: str = Field("SECRET", description="MoPNG security clearance classification")


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "Bearer"
    expires_in_seconds: int = 3600
    user: UserSession


class DemoPersonaItem(BaseModel):
    role: str
    email: str
    full_name: str
    organization_code: str
    token: str
    description: str


class DemoTokensResponse(BaseModel):
    personas: List[DemoPersonaItem]
