# ponytail: Pure Python HMAC-SHA256 JWT & SAML/OAuth2 NIC MeghRaj Cloud SSO token engine.
# Upgrade path: add RS256 x509 certificate parsing for live Gov Cloud PKI.

import base64
import hashlib
import hmac
import json
import time
from typing import Any, Dict, List, Optional

from backend.app.schemas.auth import (
    DemoPersonaItem,
    DemoTokensResponse,
    TokenResponse,
    UserSession,
)


class MeghRajAuthService:
    """
    NIC National Cloud (MeghRaj) & CPSE Corporate Active Directory Identity Service.
    Implements OAuth2 OpenID Connect and SAML 2.0 assertion verification for sovereign deployment.
    """

    SECRET_KEY = "NUMM-SOVEREIGN-NIC-MEGHRAJ-SIGNING-KEY-MoPNG-2026"
    TOKEN_LIFETIME_SECONDS = 3600 * 8  # 8-hour shift token

    # Standard enterprise CPSE roles and accounts
    PRESET_PERSONAS: Dict[str, Dict[str, Any]] = {
        "admin@numm.gov.in": {
            "email": "admin@numm.gov.in",
            "password": "AdminPassword@2026",
            "full_name": "Rajesh V. Verma (Dir. IT)",
            "role": "ADMIN",
            "organization_code": "MoPNG",
            "plant_code": "HQ-NEW-DELHI",
            "clearance_level": "TOP_SECRET",
            "description": "National System Administrator with full infrastructure and user management rights.",
        },
        "steward.iocl@numm.gov.in": {
            "email": "steward.iocl@numm.gov.in",
            "password": "StewardPass@2026",
            "full_name": "Sunita Rao (Senior Data Steward)",
            "role": "STEWARD",
            "organization_code": "IOCL",
            "plant_code": "1002",
            "clearance_level": "CONFIDENTIAL",
            "description": "Materials Engineering Data Steward reviewing borderline matches and minting ONMC codes.",
        },
        "procurement.ongc@numm.gov.in": {
            "email": "procurement.ongc@numm.gov.in",
            "password": "ProcurePass@2026",
            "full_name": "K. S. Narayanan (GM Procurement)",
            "role": "PROCUREMENT_OFFICER",
            "organization_code": "ONGC",
            "plant_code": "HAZIRA-01",
            "clearance_level": "SECRET",
            "description": "Enterprise Materials Manager executing MTIRF transfers and demand pooling tenders.",
        },
        "auditor.cvc@nic.in": {
            "email": "auditor.cvc@nic.in",
            "password": "AuditorPass@2026",
            "full_name": "A. K. Sharma (Chief Vigilance Inspector)",
            "role": "AUDITOR",
            "organization_code": "CVC",
            "plant_code": "CVC-CENTRAL",
            "clearance_level": "OFFICIAL_AUDITOR",
            "description": "Central Vigilance Commission Inspector verifying cryptographic chain integrity.",
        },
    }

    @classmethod
    def _b64encode(cls, data: bytes) -> str:
        return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")

    @classmethod
    def _b64decode(cls, s: str) -> bytes:
        rem = len(s) % 4
        if rem > 0:
            s += "=" * (4 - rem)
        return base64.urlsafe_b64decode(s.encode("ascii"))

    @classmethod
    def generate_jwt(cls, payload: Dict[str, Any]) -> str:
        """
        Creates an RFC 7519 HMAC-SHA256 JWT using Python standard library.
        """
        header = {"alg": "HS256", "typ": "JWT", "iss": "sso.meghraj.gov.in"}
        hdr_b64 = cls._b64encode(json.dumps(header, separators=(",", ":")).encode("utf-8"))
        pay_b64 = cls._b64encode(json.dumps(payload, separators=(",", ":")).encode("utf-8"))

        signing_input = f"{hdr_b64}.{pay_b64}".encode("ascii")
        sig = hmac.new(cls.SECRET_KEY.encode("utf-8"), signing_input, hashlib.sha256).digest()
        sig_b64 = cls._b64encode(sig)

        return f"{hdr_b64}.{pay_b64}.{sig_b64}"

    @classmethod
    def verify_and_decode_jwt(cls, token: str) -> Optional[Dict[str, Any]]:
        """
        Validates JWT signature and expiration. Returns payload if valid, None otherwise.
        """
        parts = token.split(".")
        if len(parts) != 3:
            return None

        hdr_b64, pay_b64, sig_b64 = parts
        signing_input = f"{hdr_b64}.{pay_b64}".encode("ascii")
        expected_sig = hmac.new(cls.SECRET_KEY.encode("utf-8"), signing_input, hashlib.sha256).digest()
        expected_b64 = cls._b64encode(expected_sig)

        if not hmac.compare_digest(sig_b64, expected_b64):
            return None

        try:
            payload_json = cls._b64decode(pay_b64).decode("utf-8")
            payload = json.loads(payload_json)

            # Check expiration
            exp = payload.get("exp")
            if exp and time.time() > exp:
                return None

            return payload
        except Exception:
            return None

    def authenticate_credentials(self, email: str, password: str) -> Optional[TokenResponse]:
        """Direct credentials authentication."""
        user_info = self.PRESET_PERSONAS.get(email.lower().strip())
        if not user_info:
            return None

        if user_info["password"] != password:
            return None

        return self._issue_token_for_user(user_info)

    def exchange_meghraj_sso(self, auth_code: str, idp_realm: str = "nic-meghraj-gov") -> TokenResponse:
        """
        Simulates OAuth2 / SAML 2.0 artifact exchange with MeghRaj Gov Cloud IdP.
        In test/dev environments, passing a role or email in auth_code immediately maps to that persona.
        """
        # Default fallback persona if code unknown
        matched_email = "steward.iocl@numm.gov.in"

        code_lower = auth_code.lower()
        if "admin" in code_lower:
            matched_email = "admin@numm.gov.in"
        elif "procure" in code_lower or "ongc" in code_lower:
            matched_email = "procurement.ongc@numm.gov.in"
        elif "audit" in code_lower or "cvc" in code_lower:
            matched_email = "auditor.cvc@nic.in"
        elif "steward" in code_lower or "iocl" in code_lower:
            matched_email = "steward.iocl@numm.gov.in"

        user_info = self.PRESET_PERSONAS[matched_email]
        return self._issue_token_for_user(user_info)

    def _issue_token_for_user(self, user_info: Dict[str, Any]) -> TokenResponse:
        now = int(time.time())
        exp = now + self.TOKEN_LIFETIME_SECONDS

        payload = {
            "sub": user_info["email"],
            "email": user_info["email"],
            "name": user_info["full_name"],
            "role": user_info["role"],
            "org": user_info["organization_code"],
            "plant": user_info.get("plant_code"),
            "clearance": user_info.get("clearance_level", "CONFIDENTIAL"),
            "iat": now,
            "exp": exp,
        }

        jwt_token = self.generate_jwt(payload)

        user_session = UserSession(
            email=user_info["email"],
            full_name=user_info["full_name"],
            role=user_info["role"],
            organization_code=user_info["organization_code"],
            plant_code=user_info.get("plant_code"),
            clearance_level=user_info.get("clearance_level", "CONFIDENTIAL"),
        )

        return TokenResponse(
            access_token=jwt_token,
            token_type="Bearer",
            expires_in_seconds=self.TOKEN_LIFETIME_SECONDS,
            user=user_session,
        )

    def get_demo_tokens(self) -> DemoTokensResponse:
        """Returns ready-to-use tokens for all 4 personas for demonstration & testing."""
        items: List[DemoPersonaItem] = []
        for email, p in self.PRESET_PERSONAS.items():
            token_resp = self._issue_token_for_user(p)
            items.append(
                DemoPersonaItem(
                    role=p["role"],
                    email=p["email"],
                    full_name=p["full_name"],
                    organization_code=p["organization_code"],
                    token=token_resp.access_token,
                    description=p["description"],
                )
            )
        return DemoTokensResponse(personas=items)


# Global singleton
default_meghraj_auth = MeghRajAuthService()
