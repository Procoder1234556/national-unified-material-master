import asyncio
import random
import uuid

from backend.app.api.v1.endpoints.ingest import _process_items_async
from backend.app.db.session import AsyncSessionLocal, engine
from backend.app.models.models import Base
from backend.app.schemas.ingest import RawMaterialIn

organizations = ["IOCL", "ONGC", "BPCL", "HPCL", "GAIL", "OIL", "EIL", "NRL", "MRPL", "CPCL"]
divisions = ["Refineries", "Pipelines", "E&P", "Marketing"]
roles = ["STEWARD", "PROCUREMENT_OFFICER", "ADMIN", "AUDITOR"]
plants = ["Mathura", "Panipat", "Mumbai", "Digboi", "Kochi", "Hazira"]

item_classes = ["BALL VALVE", "GATE VALVE", "GLOBE VALVE", "CHECK VALVE", "WELD NECK FLANGE", "SEAMLESS PIPE"]
materials = ["ASTM A105", "ASTM A216 WCB", "ASTM A351 CF8M", "SS316", "CS"]
connections = ["FLANGED RF", "BUTTWELD", "THREADED NPT"]
sizes = ["0.5 INCH", "1 INCH", "2 INCH", "4 INCH", "6 INCH", "8 INCH"]
pressures = ["150#", "300#", "600#"]


def generate_mock_descriptions(count=500):
    items = []
    for _ in range(count):
        cpse = random.choice(organizations)
        source_code = f"{cpse[:3]}-{random.randint(100000, 999999)}"
        plant = random.choice(plants)
        cls = random.choice(item_classes)
        size = random.choice(sizes)
        pressure = random.choice(pressures)
        mat = random.choice(materials)
        conn = random.choice(connections) if "VALVE" in cls else ""

        desc = f"{cls} {size} {pressure} {mat} {conn}".strip()
        price = round(random.uniform(5000.0, 90000.0), 2)
        qty = random.randint(0, 100)

        items.append(
            {
                "cpse": cpse,
                "source_code": source_code,
                "desc": desc,
                "price": price,
                "loc": f"{plant} Plant",
                "qty": qty,
            }
        )
    return items


async def seed_large_data():
    print("Generating 500 dynamic mock records...")
    mock_data = generate_mock_descriptions(500)

    from sqlalchemy import text

    async with engine.begin() as conn:
        await conn.execute(text('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'))
        await conn.execute(text('CREATE EXTENSION IF NOT EXISTS "vector";'))
        await conn.execute(text('CREATE EXTENSION IF NOT EXISTS "pg_trgm";'))
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        # Group by CPSE to process efficiently
        by_cpse = {}
        for d in mock_data:
            by_cpse.setdefault(d["cpse"], []).append(d)

        total_seeded = 0
        for cpse, items in by_cpse.items():
            in_items = [
                RawMaterialIn(
                    source_item_code=item["source_code"],
                    plant_code=item["loc"].split()[0].upper(),
                    plant_location=item["loc"],
                    raw_description=item["desc"],
                    unit_price=item["price"],
                    currency="INR",
                    stock_quantity=item["qty"],
                )
                for item in items
            ]

            # Use the app's native ingestion pipeline to get vector embeddings and attribute extraction
            await _process_items_async(session, str(uuid.uuid4()), cpse, in_items)
            total_seeded += len(in_items)
            print(f"Seeded {len(in_items)} items for {cpse}...")

        print(f"Successfully injected {total_seeded} mock materials through the native NUMM ingestion pipeline!")


if __name__ == "__main__":
    asyncio.run(seed_large_data())
