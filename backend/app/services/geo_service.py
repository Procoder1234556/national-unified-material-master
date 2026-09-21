# ponytail: Haversine geo-distance engine and CPSE plant registry for inter-company surplus discovery.
# Upgrade path: add GIS shapefile boundary routing and real-time NHAI highway toll/truck route distance API.

import math
from typing import Dict, Optional, Tuple


class GeoService:
    """
    Geospatial calculation engine for Indian Oil & Gas CPSE refinery and production assets.
    Computes great-circle Haversine distances in kilometers.
    """

    EARTH_RADIUS_KM = 6371.0

    # Official coordinates of major CPSE installations (lat, lon)
    CPSE_PLANTS: Dict[str, Dict] = {
        "IOCL_MATHURA": {
            "organization_code": "IOCL",
            "organization_name": "Indian Oil Corporation Ltd",
            "plant_code": "1002",
            "plant_name": "Mathura Refinery",
            "location_name": "Mathura, Uttar Pradesh",
            "coordinates": (27.53, 77.68),
        },
        "IOCL_GUJARAT": {
            "organization_code": "IOCL",
            "organization_name": "Indian Oil Corporation Ltd",
            "plant_code": "1001",
            "plant_name": "Gujarat Refinery",
            "location_name": "Vadodara, Gujarat",
            "coordinates": (22.36, 73.13),
        },
        "IOCL_PANIPAT": {
            "organization_code": "IOCL",
            "organization_name": "Indian Oil Corporation Ltd",
            "plant_code": "1005",
            "plant_name": "Panipat Refinery & Petrochemical Complex",
            "location_name": "Panipat, Haryana",
            "coordinates": (29.40, 76.97),
        },
        "IOCL_PARADIP": {
            "organization_code": "IOCL",
            "organization_name": "Indian Oil Corporation Ltd",
            "plant_code": "1004",
            "plant_name": "Paradip Refinery",
            "location_name": "Paradip, Odisha",
            "coordinates": (20.31, 86.61),
        },
        "IOCL_HALDIA": {
            "organization_code": "IOCL",
            "organization_name": "Indian Oil Corporation Ltd",
            "plant_code": "1003",
            "plant_name": "Haldia Refinery",
            "location_name": "Haldia, West Bengal",
            "coordinates": (22.06, 88.08),
        },
        "ONGC_HAZIRA": {
            "organization_code": "ONGC",
            "organization_name": "Oil & Natural Gas Corporation",
            "plant_code": "1100",
            "plant_name": "Hazira Gas Processing Complex",
            "location_name": "Hazira, Gujarat",
            "coordinates": (21.11, 72.65),
        },
        "ONGC_URAN": {
            "organization_code": "ONGC",
            "organization_name": "Oil & Natural Gas Corporation",
            "plant_code": "1102",
            "plant_name": "Uran Plant",
            "location_name": "Uran, Maharashtra",
            "coordinates": (18.88, 72.93),
        },
        "ONGC_MEHSANA": {
            "organization_code": "ONGC",
            "organization_name": "Oil & Natural Gas Corporation",
            "plant_code": "1103",
            "plant_name": "Mehsana Asset",
            "location_name": "Mehsana, Gujarat",
            "coordinates": (23.60, 72.40),
        },
        "BPCL_MUMBAI": {
            "organization_code": "BPCL",
            "organization_name": "Bharat Petroleum Corporation Ltd",
            "plant_code": "2001",
            "plant_name": "Mumbai Refinery",
            "location_name": "Mumbai, Maharashtra",
            "coordinates": (19.01, 72.89),
        },
        "BPCL_KOCHI": {
            "organization_code": "BPCL",
            "organization_name": "Bharat Petroleum Corporation Ltd",
            "plant_code": "2002",
            "plant_name": "Kochi Refinery",
            "location_name": "Ambalamugal, Kerala",
            "coordinates": (9.98, 76.36),
        },
        "HPCL_MUMBAI": {
            "organization_code": "HPCL",
            "organization_name": "Hindustan Petroleum Corporation Ltd",
            "plant_code": "3002",
            "plant_name": "Mumbai Refinery",
            "location_name": "Mumbai, Maharashtra",
            "coordinates": (19.00, 72.88),
        },
        "HPCL_VISAKH": {
            "organization_code": "HPCL",
            "organization_name": "Hindustan Petroleum Corporation Ltd",
            "plant_code": "3001",
            "plant_name": "Visakh Refinery",
            "location_name": "Visakhapatnam, Andhra Pradesh",
            "coordinates": (17.68, 83.27),
        },
        "GAIL_VIJAIPUR": {
            "organization_code": "GAIL",
            "organization_name": "GAIL (India) Limited",
            "plant_code": "4001",
            "plant_name": "Vijaipur Petrochemical Complex",
            "location_name": "Guna, Madhya Pradesh",
            "coordinates": (24.38, 77.29),
        },
        "OIL_DULIAJAN": {
            "organization_code": "OIL",
            "organization_name": "Oil India Limited",
            "plant_code": "5001",
            "plant_name": "Duliajan Field Headquarters",
            "location_name": "Duliajan, Assam",
            "coordinates": (27.33, 95.32),
        },
    }

    @classmethod
    def calculate_distance(cls, coord_a: Tuple[float, float], coord_b: Tuple[float, float]) -> float:
        """
        Calculates Haversine distance in kilometers between two (lat, lon) coordinates.
        """
        lat1, lon1 = coord_a
        lat2, lon2 = coord_b
        phi1, phi2 = math.radians(lat1), math.radians(lat2)
        delta_phi = math.radians(lat2 - lat1)
        delta_lambda = math.radians(lon2 - lon1)

        a = math.sin(delta_phi / 2.0) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0) ** 2
        c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(max(0.0, 1.0 - a)))
        return round(cls.EARTH_RADIUS_KM * c, 1)

    @classmethod
    def find_plant(cls, identifier: str) -> Optional[Dict]:
        """
        Resolves plant record by key, plant code, or fuzzy text in plant/location name.
        """
        norm_id = identifier.strip().upper()
        if norm_id in cls.CPSE_PLANTS:
            return dict(cls.CPSE_PLANTS[norm_id], plant_key=norm_id)

        # Check by combined org and plant code: e.g. IOCL_1002
        for key, plant in cls.CPSE_PLANTS.items():
            if f"{plant['organization_code']}_{plant['plant_code']}".upper() == norm_id:
                return dict(plant, plant_key=key)

        # Check by plant code
        for key, plant in cls.CPSE_PLANTS.items():
            if plant["plant_code"] == norm_id:
                return dict(plant, plant_key=key)

        # Check exact full substring match
        for key, plant in cls.CPSE_PLANTS.items():
            combined = f"{plant['plant_name']} {plant['location_name']} {plant['organization_code']}".upper()
            if norm_id in combined:
                return dict(plant, plant_key=key)

        # Token-based match filtering out generic stop words
        GENERIC_STOPS = {
            "REFINERY",
            "PLANT",
            "COMPLEX",
            "LIMITED",
            "CORPORATION",
            "CORP",
            "HEADQUARTERS",
            "ASSET",
            "FIELD",
            "AND",
            "THE",
        }
        query_tokens = [
            t.strip(",.") for t in norm_id.split() if len(t.strip(",.")) > 2 and t.strip(",.") not in GENERIC_STOPS
        ]

        best_match = None
        best_score = 0
        for key, plant in cls.CPSE_PLANTS.items():
            combined = f"{plant['plant_name']} {plant['location_name']} {plant['organization_code']}".upper()
            score = sum(1 for tok in query_tokens if tok in combined)
            if score > best_score:
                best_score = score
                best_match = dict(plant, plant_key=key)

        if best_match and best_score > 0:
            return best_match

        return None

    @classmethod
    def get_plant_distance(cls, plant_a_id: str, plant_b_id: str) -> float:
        """
        Computes distance in km between two plant identifiers.
        """
        plant_a = cls.find_plant(plant_a_id)
        plant_b = cls.find_plant(plant_b_id)

        if not plant_a or not plant_b:
            # Fallback default estimate for unknown installations
            return 350.0

        return cls.calculate_distance(plant_a["coordinates"], plant_b["coordinates"])

    @classmethod
    def estimate_transit_hours(cls, distance_km: float) -> int:
        """
        Estimates commercial heavy goods vehicle road transit hours (assuming 45 km/h average + 4h loading).
        """
        if distance_km <= 0:
            return 0
        driving_hours = distance_km / 45.0
        return max(4, round(driving_hours + 4.0))


default_geo_service = GeoService()
