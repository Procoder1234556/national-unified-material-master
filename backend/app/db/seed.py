import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.db.session import AsyncSessionLocal, engine
from backend.app.models.models import Base, Organization, UnifiedMasterCode, RawMaterial, CleansedMaterial, MaterialEmbedding, MaterialMapping
from backend.app.services.embedding_generator import default_embedding_generator
from sqlalchemy import select

async def seed_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    async with AsyncSessionLocal() as session:
        # Check if already seeded
        result = await session.execute(select(UnifiedMasterCode))
        if result.scalars().first():
            print("Database already seeded.")
            return

        # Seed Organizations
        orgs = [
            Organization(code="IOCL", name="Indian Oil Corporation Limited", division="Refineries"),
            Organization(code="ONGC", name="Oil and Natural Gas Corporation", division="E&P"),
            Organization(code="BPCL", name="Bharat Petroleum Corporation Limited", division="Marketing"),
        ]
        session.add_all(orgs)
        await session.flush()

        # Seed ONMC Masters
        masters = [
            UnifiedMasterCode(
                onmc_code="ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
                canonical_description="VALVE BALL FLGD 2 INCH 150# CS ASTM A105 API 6D",
                item_class="BALL VALVE",
                size_inch=2.0,
                pressure_class=150,
                metallurgy="ASTM A105",
                end_connection="FLANGED RF",
                shell_mesc_code="74.16.01.015.1",
                unspsc_code="40141607",
                gem_category_id="52161500"
            ),
            UnifiedMasterCode(
                onmc_code="ONMC-PIP-FLG-WN-006-300-A105-882E",
                canonical_description="FLANGE WELD NECK 6 INCH 300# RF CS ASTM A105 SCH 40 ASME B16.5",
                item_class="WELD NECK FLANGE",
                size_inch=6.0,
                pressure_class=300,
                metallurgy="ASTM A105",
                end_connection="WELD NECK RF",
                shell_mesc_code="76.22.14.006.1",
                unspsc_code="40173305",
                gem_category_id="52161502"
            )
        ]
        session.add_all(masters)
        await session.commit()
                # Seed RawMaterials and MaterialMappings for realistic stock discovery
        raw_materials = [
            RawMaterial(
                organization_id=orgs[0].id,
                source_item_code="MAT-1002931",
                plant_code="1001",
                plant_location="Gujarat Refinery, Vadodara",
                raw_description="VALVE BALL FLGD 2 INCH 150# CS ASTM A105 API 6D",
                unit_price=28500,
                stock_quantity=14,
                uom="EA"
            ),
            RawMaterial(
                organization_id=orgs[1].id,
                source_item_code="MAT-8849102",
                plant_code="1100",
                plant_location="Hazira Gas Processing Plant",
                raw_description="BALL VALVE 2IN 150LB FLGD WCB BODY",
                unit_price=32000,
                stock_quantity=6,
                uom="EA"
            ),
            RawMaterial(
                organization_id=orgs[2].id,
                source_item_code="MAT-3049104",
                plant_code="2001",
                plant_location="Mumbai Refinery, Mahul",
                raw_description="FLG WN 6 INCH 300LBS RF CS ASTM A-105 SCH40 ASME B16.5",
                unit_price=14500,
                stock_quantity=24,
                uom="EA"
            )
        ]
        session.add_all(raw_materials)
        await session.flush()

        mappings = [
            MaterialMapping(
                raw_material_id=raw_materials[0].id,
                unified_master_id=masters[0].id,
                confidence_score=0.98,
                lexical_similarity=0.95,
                semantic_similarity=0.99,
                rule_gate_passed=True,
                mapping_status="AUTO_APPROVED"
            ),
            MaterialMapping(
                raw_material_id=raw_materials[1].id,
                unified_master_id=masters[0].id,
                confidence_score=0.88,
                lexical_similarity=0.82,
                semantic_similarity=0.91,
                rule_gate_passed=True,
                mapping_status="MANUALLY_APPROVED"
            ),
            MaterialMapping(
                raw_material_id=raw_materials[2].id,
                unified_master_id=masters[1].id,
                confidence_score=0.95,
                lexical_similarity=0.92,
                semantic_similarity=0.96,
                rule_gate_passed=True,
                mapping_status="AUTO_APPROVED"
            )
        ]
        session.add_all(mappings)
        await session.commit()
        print("Seeded database with ONMC masters, raw materials, and mappings.")

if __name__ == "__main__":
    asyncio.run(seed_db())
