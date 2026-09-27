"""Idempotent production-demo data loader used by Render's initial deploy hook."""

import asyncio

from backend.app.db.seed import seed_data

if __name__ == "__main__":
    asyncio.run(seed_data())
