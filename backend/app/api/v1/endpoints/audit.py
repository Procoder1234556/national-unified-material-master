# ponytail: CVC/CAG append-only cryptographic audit chain and statutory verification endpoints.
# Upgrade path: add automated digital timestamp notary receipt export.

from fastapi import APIRouter, Query, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.db.session import get_db

from backend.app.schemas.audit import (
    AuditChainResponse,
    AuditChainVerificationResponse,
    AuditStatsResponse,
    CVCDossierExportResponse,
)
from backend.app.services.cvc_audit_service import default_cvc_audit_service

router = APIRouter()


@router.get("/chain", response_model=AuditChainResponse, summary="Get paginated cryptographic audit chain blocks")
async def get_audit_chain(
    limit: int = Query(50, ge=1, le=500, description="Max blocks to return"),
    offset: int = Query(0, ge=0, description="Pagination offset"),
    session: AsyncSession = Depends(get_db)
):
    """
    Returns sequential cryptographic blocks from the immutable append-only ledger.
    Each block contains its SHA-256 hash and links to the previous block's hash.
    """
    return await default_cvc_audit_service.get_chain(session, limit=limit, offset=offset)


@router.get(
    "/verify", response_model=AuditChainVerificationResponse, summary="Execute full cryptographic chain verification"
)
async def verify_chain(session: AsyncSession = Depends(get_db)):
    """
    Traverses the entire ledger from Genesis Root to the current Tip.
    Validates all hash pointers and recomputes block hashes to guarantee zero tampering.
    """
    return await default_cvc_audit_service.verify_chain_integrity(session)


@router.get("/stats", response_model=AuditStatsResponse, summary="Get audit ledger statistics and health status")
async def get_audit_stats(session: AsyncSession = Depends(get_db)):
    """
    Returns ledger summary: total blocks, unique actors, action breakdown, and chain health.
    """
    return await default_cvc_audit_service.get_stats(session)


@router.get(
    "/export", response_model=CVCDossierExportResponse, summary="Export formal CVC audit inspection certificate"
)
async def export_cvc_dossier(session: AsyncSession = Depends(get_db)):
    """
    Synthesizes official Central Vigilance Commission (CVC) & CAG compliance dossier
    with complete cryptographic provenance for sovereign audit inspection.
    """
    return await default_cvc_audit_service.export_cvc_dossier(session)
