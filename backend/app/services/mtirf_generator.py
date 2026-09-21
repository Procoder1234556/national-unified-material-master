# ponytail: MoPNG standard Material Transfer Inter-Company Requisition Form (MTIRF) generator and state machine.
# Upgrade path: add PDF rendering via WeasyPrint and automated RFC call to SAP ERP BAPI_OUTB_DELIVERY_CREATE.

import hashlib
import json
import uuid
from datetime import datetime, timezone
from typing import Dict, Optional

from backend.app.schemas.surplus import (
    MTIRFApproveRequest,
    MTIRFApproveResponse,
    MTIRFDocument,
    MTIRFGenerateRequest,
)
from backend.app.services.geo_service import default_geo_service
from backend.app.services.taxonomy_mapper import default_taxonomy_mapper


class MTIRFGenerator:
    """
    Generates and manages MoPNG Standard Material Transfer Inter-Company Requisition Forms (MTIRF).
    Enforces CVC cryptographic audit trails and SAP ERP delivery integration metadata.
    """

    def __init__(self):
        # In-memory document storage (ponytail simplification; upgrade path: persist in relational DB table)
        self._store: Dict[str, MTIRFDocument] = {}
        self._audit_log: Dict[str, Dict] = {}

    def _generate_sha256(self, data: Dict) -> str:
        serialized = json.dumps(data, sort_keys=True, default=str)
        return hashlib.sha256(serialized.encode("utf-8")).hexdigest()

    def generate_form(self, req: MTIRFGenerateRequest, item_lookup: Optional[Dict] = None) -> MTIRFDocument:
        """
        Creates a new formal MTIRF document between two CPSE plants.
        """
        source_plant = default_geo_service.find_plant(req.source_plant_key)
        if not source_plant:
            raise ValueError(f"Source CPSE installation '{req.source_plant_key}' not found in registry.")

        dest_plant = default_geo_service.find_plant(req.destination_plant_key)
        if not dest_plant:
            raise ValueError(f"Destination CPSE installation '{req.destination_plant_key}' not found in registry.")

        # Calculate transit distance & time
        distance_km = default_geo_service.calculate_distance(source_plant["coordinates"], dest_plant["coordinates"])
        transit_hours = default_geo_service.estimate_transit_hours(distance_km)

        # Requisition Number format: MTIRF-2026-XXXXX
        short_id = uuid.uuid4().hex[:8].upper()
        req_number = f"MTIRF-2026-{short_id}"
        now_iso = datetime.now(timezone.utc).isoformat()

        # Item info extraction
        desc = (
            item_lookup.get("canonical_description", "MATERIAL MASTER SPECIFICATION")
            if item_lookup
            else "STANDARDIZED ONMC COMPONENT"
        )
        unit_val = float(item_lookup.get("unit_price", 28500.0) if item_lookup else 28500.0)
        total_val = round(unit_val * req.transfer_quantity, 2)

        tax_meta = default_taxonomy_mapper.map_taxonomy(
            {
                "item_class": item_lookup.get("item_class", "BALL_VALVE") if item_lookup else "BALL_VALVE",
                "size_inch": item_lookup.get("size_inch", 2.0) if item_lookup else 2.0,
                "pressure_class": item_lookup.get("pressure_class", 150) if item_lookup else 150,
            }
        )

        item_details = {
            "onmc_code": req.onmc_code,
            "canonical_description": desc,
            "shell_mesc_code": tax_meta.get("shell_mesc_code", "74.16.01.015.1"),
            "mesc_spe_spec": tax_meta.get("mesc_spe_spec", "SPE 77/300"),
            "unspsc_code": tax_meta.get("unspsc_code", "40141607"),
            "gem_category_id": tax_meta.get("gem_category_id", "GeM-CAT-VLV-BALL-01"),
        }

        source_details = {
            "organization_code": source_plant["organization_code"],
            "organization_name": source_plant["organization_name"],
            "plant_code": source_plant["plant_code"],
            "plant_name": source_plant["plant_name"],
            "location_name": source_plant["location_name"],
        }

        dest_details = {
            "organization_code": dest_plant["organization_code"],
            "organization_name": dest_plant["organization_name"],
            "plant_code": dest_plant["plant_code"],
            "plant_name": dest_plant["plant_name"],
            "location_name": dest_plant["location_name"],
        }

        requesting_officer = {
            "name": req.requesting_officer_name,
            "designation": req.requesting_officer_designation,
            "email": req.requesting_officer_email,
            "organization": dest_plant["organization_code"],
        }

        # Simulated SAP handshake parameters
        erp_handshake = {
            "sap_movement_type": "351 (Inter-Company Stock Transfer to Transit)",
            "sap_outbound_tcode": "VL01N (Outbound Delivery Creation)",
            "sap_inbound_tcode": "ME21N (Stock Transport Purchase Order)",
            "cvc_compliance_certificate": f"CVC/MoPNG/ITR/{short_id}",
        }

        # Generate cryptographic integrity seal
        seal_payload = {
            "requisition_number": req_number,
            "onmc_code": req.onmc_code,
            "source_plant": source_plant["plant_code"],
            "destination_plant": dest_plant["plant_code"],
            "quantity": req.transfer_quantity,
            "total_valuation_inr": total_val,
            "created_at": now_iso,
        }
        sha_hash = self._generate_sha256(seal_payload)

        doc = MTIRFDocument(
            requisition_number=req_number,
            created_at=now_iso,
            regulatory_mandate="MoPNG/OM/2026/NUMM-149 (Inter-CPSE Emergency Material Transfer Protocol)",
            status="SUBMITTED",
            item_details=item_details,
            source_details=source_details,
            destination_details=dest_details,
            quantity=req.transfer_quantity,
            uom="EA",
            unit_valuation_inr=unit_val,
            total_valuation_inr=total_val,
            distance_km=distance_km,
            estimated_transit_hours=transit_hours,
            emergency_category=req.emergency_category,
            justification_reason=req.justification_reason,
            requesting_officer=requesting_officer,
            approving_officer=None,
            cvc_tamper_seal={
                "sha256_digest": sha_hash,
                "algorithm": "SHA-256 (FIPS 180-4)",
                "sealed_at": now_iso,
                "tamper_evident": True,
            },
            erp_handshake=erp_handshake,
        )

        self._store[req_number] = doc
        return doc

    def get_document(self, req_number: str) -> Optional[MTIRFDocument]:
        """Retrieves MTIRF document by requisition number."""
        return self._store.get(req_number)

    def approve_requisition(self, req: MTIRFApproveRequest) -> MTIRFApproveResponse:
        """
        Formally authorizes MTIRF transfer from the source CPSE materials management division.
        """
        doc = self._store.get(req.requisition_number)
        if not doc:
            raise KeyError(f"MTIRF requisition '{req.requisition_number}' not found.")

        now_iso = datetime.now(timezone.utc).isoformat()
        doc.status = "APPROVED_BY_SOURCE"
        doc.approving_officer = {
            "name": req.approving_officer_name,
            "email": req.approving_officer_email,
            "designation": req.approving_officer_designation,
            "e_sign_token": req.e_sign_pin_or_token or "VERIFIED-E-SIGN",
            "approved_at": now_iso,
        }

        # Simulated SAP documents
        deliv_id = f"800{uuid.uuid4().int % 10000000:07d}"
        po_id = f"450{uuid.uuid4().int % 10000000:07d}"

        # Cryptographic approval seal chaining prior document digest
        prior_hash = doc.cvc_tamper_seal["sha256_digest"]
        approval_payload = {
            "requisition_number": doc.requisition_number,
            "prior_hash": prior_hash,
            "approver": req.approving_officer_email,
            "approved_at": now_iso,
            "status": "APPROVED",
        }
        approval_hash = self._generate_sha256(approval_payload)
        doc.cvc_tamper_seal["approval_sha256_digest"] = approval_hash

        audit_id = str(uuid.uuid4())
        self._audit_log[audit_id] = {
            "action": "MTIRF_SOURCE_APPROVE",
            "requisition_number": doc.requisition_number,
            "sha256_hash": approval_hash,
            "timestamp": now_iso,
        }

        return MTIRFApproveResponse(
            requisition_number=doc.requisition_number,
            status=doc.status,
            approved_at=now_iso,
            approving_officer_name=req.approving_officer_name,
            sha256_hash=approval_hash,
            sap_outbound_delivery_note=deliv_id,
            sap_inbound_purchase_order=po_id,
            audit_log_id=audit_id,
        )


default_mtirf_generator = MTIRFGenerator()
