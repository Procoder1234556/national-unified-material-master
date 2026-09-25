import random
import uuid
from datetime import datetime, timedelta

# Research context:
# - Shell MESC codes for Valves (SPE 77/300) are 74.1601.XXX for SS Ball Valves
# - UNSPSC 8-digit codes for valves (e.g. 40141607)

organizations = ["IOCL", "ONGC", "BPCL", "HPCL", "GAIL", "OIL", "EIL", "NRL", "MRPL", "CPCL"]
divisions = ["Refineries", "Pipelines", "E&P", "Marketing"]
roles = ["STEWARD", "PROCUREMENT_OFFICER", "ADMIN", "AUDITOR"]
plants = ["Mathura", "Panipat", "Mumbai", "Digboi", "Kochi"]

item_classes = ["BALL_VALVE", "GATE_VALVE", "WELD_NECK_FLANGE", "PIPE_SEAMLESS"]
materials = ["ASTM_A105", "ASTM_A216_WCB", "ASTM_A351_CF8M"]
connections = ["FLANGED_RF", "BUTTWELD", "THREADED_NPT"]
sizes = [0.5, 1.0, 2.0, 4.0, 6.0, 8.0, 10.0]
pressures = [150, 300, 600, 900, 1500]


def random_date(start_days_ago=365):
    d = datetime.now() - timedelta(days=random.randint(0, start_days_ago))
    return d.isoformat()


def generate_schema_and_mock_data():
    sql = []

    # Orgs
    org_ids = {}
    for org in organizations:
        org_id = str(uuid.uuid4())
        org_ids[org] = org_id
        sql.append(
            f"INSERT INTO organizations (id, code, name, division) VALUES ('{org_id}', '{org}', '{org} Corporation', '{random.choice(divisions)}');"
        )

    # Users
    user_ids = []
    for i in range(50):
        uid = str(uuid.uuid4())
        user_ids.append(uid)
        org_id = random.choice(list(org_ids.values()))
        sql.append(
            f"INSERT INTO users (id, organization_id, email, hashed_password, full_name, role) VALUES ('{uid}', '{org_id}', 'user{i}@example.com', 'hash', 'User {i}', '{random.choice(roles)}');"
        )

    # Raw Materials & Cleansed
    raw_ids = []
    cleansed_ids = []
    for i in range(500):
        raw_id = str(uuid.uuid4())
        raw_ids.append(raw_id)
        org_id = random.choice(list(org_ids.values()))
        source_code = f"MAT-{random.randint(100000, 999999)}"
        plant = random.choice(plants)
        cls = random.choice(item_classes)
        size = random.choice(sizes)
        pressure = random.choice(pressures)
        desc = f"{cls.replace('_', ' ')} {size} INCH {pressure}# CS"
        price = round(random.uniform(100.0, 5000.0), 2)
        qty = random.randint(0, 1000)

        sql.append(
            f"INSERT INTO raw_materials (id, organization_id, source_item_code, plant_code, plant_location, raw_description, unit_price, stock_quantity) VALUES ('{raw_id}', '{org_id}', '{source_code}', 'P-{plant[:3].upper()}', '{plant}', '{desc}', {price}, {qty});"
        )

        cleansed_id = str(uuid.uuid4())
        cleansed_ids.append(cleansed_id)
        sql.append(
            f"INSERT INTO cleansed_materials (id, raw_material_id, cleaned_description, item_class, size_inch, pressure_class, metallurgy, end_connection) VALUES ('{cleansed_id}', '{raw_id}', '{desc}', '{cls}', {size}, {pressure}, '{random.choice(materials)}', '{random.choice(connections)}');"
        )

    # Unified Master Codes
    master_ids = []
    for i in range(100):
        mid = str(uuid.uuid4())
        master_ids.append(mid)
        onmc = f"ONMC-MECH-{random.randint(1000, 9999)}"
        mesc = f"74.1601.{random.randint(100, 999)}.1"
        unspsc = "40141607" if "VALVE" in random.choice(item_classes) else "40141700"
        sql.append(
            f"INSERT INTO unified_master_codes (id, onmc_code, canonical_description, item_class, size_inch, pressure_class, shell_mesc_code, unspsc_code) VALUES ('{mid}', '{onmc}', 'Canonical Master Item {i}', '{random.choice(item_classes)}', {random.choice(sizes)}, {random.choice(pressures)}, '{mesc}', '{unspsc}');"
        )

    with open("d:/oil/mock_data.sql", "w") as f:
        f.write("\n".join(sql))


if __name__ == "__main__":
    generate_schema_and_mock_data()
    print("Mock data generated in d:/oil/mock_data.sql")
