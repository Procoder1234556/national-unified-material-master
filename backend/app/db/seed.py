import asyncio
import json
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, text
from backend.app.models.models import Organization, User, RawMaterial, Base, UnifiedMasterCode
from backend.app.db.session import engine, AsyncSessionLocal
from backend.app.core.config import settings
from backend.app.api.v1.endpoints.ingest import _process_items_async
from backend.app.schemas.ingest import RawMaterialIn

POC_DATA = [
    {"id": "01", "cpse": "IOCL", "source_code": "IOC-100482", "desc": 'VALVE, BALL, 2", CL150, FLG RF, ASTM A105, API 6D', "price": 28500, "loc": "Mathura Refinery, UP"},
    {"id": "02", "cpse": "ONGC", "source_code": "ONG-992144", "desc": "VLV BL FLGD 50MM NB 150# CS BODY A105 LEVER OP", "price": 29200, "loc": "Hazira Processing Plant, GJ"},
    {"id": "03", "cpse": "BPCL", "source_code": "BPC-402910", "desc": "2IN 150LB BALL VALVE FLANGED WCB/A105 TRIM 316", "price": 27800, "loc": "Mumbai Refinery, MH"},
    {"id": "04", "cpse": "HPCL", "source_code": "HPC-773102", "desc": "VALVE BALL FLG 2INCH 150# CS ASTM A-105", "price": 28100, "loc": "Visakhapatnam Refinery, AP"},
    {"id": "05", "cpse": "GAIL", "source_code": "GAL-110294", "desc": "BALL VLV, 2 IN, ASME 150, FLANGED, CS BODY", "price": 28900, "loc": "Vijaipur Compressor Station, MP"},
    {"id": "06", "cpse": "OIL",  "source_code": "OIL-550192", "desc": '2" NB BALL VALVE 150 CLASS FLANGED CS A105', "price": 29000, "loc": "Dulia Field HQ, AS"},
    {"id": "07", "cpse": "IOCL", "source_code": "IOC-200911", "desc": 'VALVE, GATE, 4", CL300, FLG RF, ASTM A216 WCB', "price": 64000, "loc": "Panipat Refinery, HR"},
    {"id": "08", "cpse": "ONGC", "source_code": "ONG-881023", "desc": "VLV GT FLGD 100MM NB 300# WCB OS&Y API 600", "price": 66500, "loc": "Uran Extraction Plant, MH"},
    {"id": "09", "cpse": "BPCL", "source_code": "BPC-501239", "desc": "4IN 300LB GATE VALVE FLANGED CAST CS A216", "price": 63200, "loc": "Kochi Refinery, KL"},
    {"id": "10", "cpse": "HPCL", "source_code": "HPC-881920", "desc": "GATE VLV 4 INCH 300# CS BODY ASTM A216 WCB", "price": 65000, "loc": "Mumbai Refinery, MH"},
    {"id": "11", "cpse": "IOCL", "source_code": "IOC-300481", "desc": 'VALVE, GLOBE, 3", CL150, FLG RF, WCB, BS 1873', "price": 48000, "loc": "Paradip Refinery, OD"},
    {"id": "12", "cpse": "BPCL", "source_code": "BPC-602911", "desc": "3IN 150LB GLOBE VALVE FLANGED BODY A216-WCB", "price": 47500, "loc": "Mumbai Refinery, MH"},
    {"id": "13", "cpse": "ONGC", "source_code": "ONG-771920", "desc": "VLV CHK FLGD 50MM 150# CS A105 DUAL PLATE", "price": 22000, "loc": "Hazira Processing Plant, GJ"},
    {"id": "14", "cpse": "GAIL", "source_code": "GAL-220194", "desc": "NON RETURN VALVE 2 INCH 150# FLANGED CS BODY", "price": 21800, "loc": "Pata Petrochemical Plant, UP"},
    {"id": "15", "cpse": "IOCL", "source_code": "IOC-400192", "desc": 'FLG, WNRF, 6", CL150, SCH 40, ASTM A105, ASME B16.5', "price": 8400, "loc": "Gujarat Refinery, Vadodara"},
    {"id": "16", "cpse": "ONGC", "source_code": "ONG-662910", "desc": "WELD NECK FLANGE 150MM NB 150# SCH40 CS A105", "price": 8600, "loc": "Ankleshwar Asset, GJ"},
    {"id": "17", "cpse": "BPCL", "source_code": "BPC-701920", "desc": "6IN 150LB WNRF FLANGE SCH 40 ASTM A-105", "price": 8200, "loc": "Mumbai Refinery, MH"},
    {"id": "18", "cpse": "HPCL", "source_code": "HPC-991204", "desc": 'FLANGE WN RF 6" 150 CLASS SCH 40 CS BODY', "price": 8500, "loc": "Visakhapatnam Refinery, AP"},
    {"id": "19", "cpse": "IOCL", "source_code": "IOC-500291", "desc": 'GASKET, SPWD, 2", CL150, SS316/GRAFOIL, ASME B16.20', "price": 1200, "loc": "Mathura Refinery, UP"},
    {"id": "20", "cpse": "ONGC", "source_code": "ONG-551029", "desc": "SPIRAL WOUND GASKET 50MM 150# 316SS WITH GRAPHITE", "price": 1250, "loc": "Hazira Processing Plant, GJ"},
    {"id": "21", "cpse": "BPCL", "source_code": "BPC-801293", "desc": "2IN 150# SPWD GASKET SS 316 / GRAPHITE FILLER", "price": 1180, "loc": "Kochi Refinery, KL"},
    {"id": "22", "cpse": "IOCL", "source_code": "IOC-600192", "desc": 'PIPE, SMLS, 4", SCH 40, ASTM A106 GR B, BE, API 5L', "price": 14500, "loc": "Panipat Refinery, HR"},
    {"id": "23", "cpse": "GAIL", "source_code": "GAL-330192", "desc": "4 INCH SCH 40 SEAMLESS LINE PIPE ASTM A106-B", "price": 14200, "loc": "Vijaipur Compressor Station, MP"},
    {"id": "24", "cpse": "NRL",  "source_code": "NRL-110293", "desc": "LINE PIPE SMLS 100MM NB SCH40 CS ASTM A106 GR B", "price": 14800, "loc": "Numaligarh Refinery, AS"}
]

SEEDS = [
    {"desc": "VALVE BALL FLGD 2 INCH 150# CS ASTM A105 API 6D", "code": "ONMC-MECH-VLV-BAL-002-150-A105-9B2F", "cls": "BALL_VALVE", "size": 2.0, "p": 150, "met": "ASTM A105"},
    {"desc": "FLANGE WELD NECK 6 INCH 150# RF CS ASTM A105 ASME B16.5", "code": "ONMC-PIPE-FLG-WNF-006-150-A105-4D1E", "cls": "WELD_NECK_FLANGE", "size": 6.0, "p": 150, "met": "ASTM A105"},
    {"desc": "VALVE GATE FLANGED 4 INCH 300# CS ASTM A216 WCB ASME B16.34", "code": "ONMC-MECH-VLV-GAT-004-300-A216-7A3C", "cls": "GATE_VALVE", "size": 4.0, "p": 300, "met": "ASTM A216"},
    {"desc": "GASKET SPIRAL WOUND 2 INCH 150# SS316 GRAPHITE ASME B16.20", "code": "ONMC-STAT-GSK-SPW-002-150-SS316-2F88", "cls": "SPIRAL_WOUND_GASKET", "size": 2.0, "p": 150, "met": "SS316"},
    {"desc": "VALVE CHECK SWING 2 INCH 150# CS ASTM A105 API 6D", "code": "ONMC-MECH-VLV-CHK-002-150-A105-1C9A", "cls": "CHECK_VALVE", "size": 2.0, "p": 150, "met": "ASTM A105"},
    {"desc": "PIPE LINE SEAMLESS 4 INCH SCH 40 CS ASTM A106 GR B API 5L", "code": "ONMC-PIPE-PIP-SML-004-040-A106-5E2B", "cls": "LINE_PIPE", "size": 4.0, "p": None, "met": "ASTM A106"},
    {"desc": "VALVE GLOBE FLANGED 3 INCH 150# CS ASTM A216 WCB", "code": "ONMC-MECH-VLV-GLB-003-150-A216-8D2A", "cls": "GLOBE_VALVE", "size": 3.0, "p": 150, "met": "ASTM A216"}
]

async def seed_data():
    if not settings.USE_SQLITE:
        return
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
        
    async with AsyncSessionLocal() as session:
        # Create UnifiedMasterCodes
        for s in SEEDS:
            umc = UnifiedMasterCode(
                onmc_code=s["code"],
                canonical_description=s["desc"],
                item_class=s["cls"],
                size_inch=s["size"],
                pressure_class=s["p"],
                metallurgy=s["met"],
                shell_mesc_code="74.16.01.015.1" if s["cls"] == "BALL VALVE" else None,
                unspsc_code="40141607" if s["cls"] == "BALL VALVE" else None
            )
            session.add(umc)
        await session.commit()
        
        # Group by CPSE
        by_cpse = {}
        for d in POC_DATA:
            by_cpse.setdefault(d["cpse"], []).append(d)
            
        for cpse, items in by_cpse.items():
            in_items = [
                RawMaterialIn(
                    source_item_code=item["source_code"],
                    plant_code=item["loc"].split(",")[0].replace(" ", "_").upper(),
                    plant_location=item["loc"],
                    raw_description=item["desc"],
                    unit_price=item["price"],
                    currency="INR",
                    stock_quantity=14 if cpse == "ONGC" and "Hazira" in item["loc"] else (100 if cpse == "IOCL" else 5)
                ) for item in items
            ]
            await _process_items_async(session, str(uuid.uuid4()), cpse, in_items)

        print("Successfully seeded POC data!")

if __name__ == "__main__":
    asyncio.run(seed_data())
