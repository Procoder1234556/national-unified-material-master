"""001 Initial NUMM Canonical Schema

Revision ID: 001_initial_numm_schema
Revises:
Create Date: 2026-09-21 22:15:00.000000

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

try:
    from pgvector.sqlalchemy import Vector
except ImportError:
    Vector = None

# revision identifiers, used by Alembic.
revision: str = "001_initial_numm_schema"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    bind = op.get_bind()
    is_postgres = bind.dialect.name == "postgresql"

    if is_postgres:
        op.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        op.execute('CREATE EXTENSION IF NOT EXISTS "vector"')
        op.execute('CREATE EXTENSION IF NOT EXISTS "pg_trgm"')

    # 1. Organizations
    op.create_table(
        "organizations",
        sa.Column(
            "id",
            sa.Uuid(as_uuid=True),
            primary_key=True,
            server_default=sa.text("uuid_generate_v4()") if is_postgres else None,
        ),
        sa.Column("code", sa.String(16), nullable=False, unique=True),
        sa.Column("name", sa.String(128), nullable=False),
        sa.Column("division", sa.String(64), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    # 2. Users
    op.create_table(
        "users",
        sa.Column(
            "id",
            sa.Uuid(as_uuid=True),
            primary_key=True,
            server_default=sa.text("uuid_generate_v4()") if is_postgres else None,
        ),
        sa.Column(
            "organization_id",
            sa.Uuid(as_uuid=True),
            sa.ForeignKey("organizations.id", ondelete="RESTRICT"),
            nullable=False,
        ),
        sa.Column("email", sa.String(128), nullable=False, unique=True),
        sa.Column("hashed_password", sa.String(256), nullable=False),
        sa.Column("full_name", sa.String(128), nullable=False),
        sa.Column(
            "role",
            sa.String(32),
            sa.CheckConstraint("role IN ('STEWARD', 'PROCUREMENT_OFFICER', 'ADMIN', 'AUDITOR')"),
            nullable=False,
        ),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    # 3. Raw Materials
    op.create_table(
        "raw_materials",
        sa.Column(
            "id",
            sa.Uuid(as_uuid=True),
            primary_key=True,
            server_default=sa.text("uuid_generate_v4()") if is_postgres else None,
        ),
        sa.Column(
            "organization_id",
            sa.Uuid(as_uuid=True),
            sa.ForeignKey("organizations.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("source_item_code", sa.String(64), nullable=False),
        sa.Column("plant_code", sa.String(32), nullable=False),
        sa.Column("plant_location", sa.String(128), nullable=False),
        sa.Column("raw_description", sa.Text(), nullable=False),
        sa.Column("unit_price", sa.Numeric(14, 2), nullable=False, server_default="0.00"),
        sa.Column("currency", sa.String(8), nullable=False, server_default="INR"),
        sa.Column("stock_quantity", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("uom", sa.String(16), nullable=False, server_default="EA"),
        sa.Column("source_system", sa.String(32), nullable=False, server_default="SAP_ECC"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("idx_raw_materials_org", "raw_materials", ["organization_id"])
    op.create_index("idx_raw_materials_code", "raw_materials", ["source_item_code"])

    # 4. Cleansed Materials
    json_type = postgresql.JSONB if is_postgres else sa.JSON
    op.create_table(
        "cleansed_materials",
        sa.Column(
            "id",
            sa.Uuid(as_uuid=True),
            primary_key=True,
            server_default=sa.text("uuid_generate_v4()") if is_postgres else None,
        ),
        sa.Column(
            "raw_material_id",
            sa.Uuid(as_uuid=True),
            sa.ForeignKey("raw_materials.id", ondelete="CASCADE"),
            nullable=False,
            unique=True,
        ),
        sa.Column("cleaned_description", sa.Text(), nullable=False),
        sa.Column("item_class", sa.String(64), nullable=False),
        sa.Column("size_inch", sa.Numeric(6, 3), nullable=True),
        sa.Column("size_mm", sa.Integer(), nullable=True),
        sa.Column("pressure_class", sa.Integer(), nullable=True),
        sa.Column("metallurgy", sa.String(64), nullable=True),
        sa.Column("end_connection", sa.String(64), nullable=True),
        sa.Column("standards", json_type, nullable=False, server_default="[]"),
        sa.Column("parametric_attributes", json_type, nullable=False, server_default="{}"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("idx_cleansed_class", "cleansed_materials", ["item_class"])
    op.create_index("idx_cleansed_size", "cleansed_materials", ["size_inch"])
    op.create_index("idx_cleansed_pressure", "cleansed_materials", ["pressure_class"])
    if is_postgres:
        op.create_index("idx_cleansed_gin", "cleansed_materials", ["parametric_attributes"], postgresql_using="gin")

    # 5. Material Embeddings
    vector_type = Vector(1024) if (is_postgres and Vector is not None) else sa.JSON
    op.create_table(
        "material_embeddings",
        sa.Column(
            "id",
            sa.Uuid(as_uuid=True),
            primary_key=True,
            server_default=sa.text("uuid_generate_v4()") if is_postgres else None,
        ),
        sa.Column(
            "cleansed_material_id",
            sa.Uuid(as_uuid=True),
            sa.ForeignKey("cleansed_materials.id", ondelete="CASCADE"),
            nullable=False,
            unique=True,
        ),
        sa.Column("embedding_1024", vector_type, nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    if is_postgres:
        op.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_material_embeddings_hnsw
            ON material_embeddings
            USING hnsw (embedding_1024 vector_cosine_ops)
            WITH (m = 16, ef_construction = 64)
            """
        )

    # 6. Unified Master Codes (ONMC)
    op.create_table(
        "unified_master_codes",
        sa.Column(
            "id",
            sa.Uuid(as_uuid=True),
            primary_key=True,
            server_default=sa.text("uuid_generate_v4()") if is_postgres else None,
        ),
        sa.Column("onmc_code", sa.String(128), nullable=False, unique=True),
        sa.Column("canonical_description", sa.Text(), nullable=False),
        sa.Column("item_class", sa.String(64), nullable=False),
        sa.Column("size_inch", sa.Numeric(6, 3), nullable=True),
        sa.Column("pressure_class", sa.Integer(), nullable=True),
        sa.Column("metallurgy", sa.String(64), nullable=True),
        sa.Column("end_connection", sa.String(64), nullable=True),
        sa.Column("shell_mesc_code", sa.String(32), nullable=True),
        sa.Column("mesc_spe_spec", sa.String(32), nullable=True),
        sa.Column("unspsc_code", sa.String(16), nullable=True),
        sa.Column("gem_category_id", sa.String(64), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("idx_onmc_code", "unified_master_codes", ["onmc_code"])
    op.create_index("idx_onmc_mesc", "unified_master_codes", ["shell_mesc_code"])
    op.create_index("idx_onmc_unspsc", "unified_master_codes", ["unspsc_code"])

    # 7. Duplicate Clusters
    op.create_table(
        "duplicate_clusters",
        sa.Column(
            "id",
            sa.Uuid(as_uuid=True),
            primary_key=True,
            server_default=sa.text("uuid_generate_v4()") if is_postgres else None,
        ),
        sa.Column("cluster_hash", sa.String(64), nullable=False, unique=True),
        sa.Column("item_class", sa.String(64), nullable=False),
        sa.Column("item_count", sa.Integer(), nullable=False, server_default="1"),
        sa.Column(
            "status",
            sa.String(32),
            sa.CheckConstraint("status IN ('PENDING', 'RESOLVED', 'REJECTED')"),
            nullable=False,
            server_default="PENDING",
        ),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    # 8. Material Mappings
    op.create_table(
        "material_mappings",
        sa.Column(
            "id",
            sa.Uuid(as_uuid=True),
            primary_key=True,
            server_default=sa.text("uuid_generate_v4()") if is_postgres else None,
        ),
        sa.Column(
            "raw_material_id",
            sa.Uuid(as_uuid=True),
            sa.ForeignKey("raw_materials.id", ondelete="CASCADE"),
            nullable=False,
            unique=True,
        ),
        sa.Column(
            "unified_master_id",
            sa.Uuid(as_uuid=True),
            sa.ForeignKey("unified_master_codes.id", ondelete="SET NULL"),
            nullable=True,
        ),
        sa.Column(
            "duplicate_cluster_id",
            sa.Uuid(as_uuid=True),
            sa.ForeignKey("duplicate_clusters.id", ondelete="SET NULL"),
            nullable=True,
        ),
        sa.Column("confidence_score", sa.Numeric(5, 4), nullable=False),
        sa.Column("lexical_similarity", sa.Numeric(5, 4), nullable=False),
        sa.Column("semantic_similarity", sa.Numeric(5, 4), nullable=False),
        sa.Column(
            "rule_gate_passed",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("true") if is_postgres else sa.text("1"),
        ),
        sa.Column(
            "mapping_status",
            sa.String(32),
            sa.CheckConstraint(
                "mapping_status IN ('AUTO_APPROVED', 'PENDING_REVIEW', 'MANUALLY_APPROVED', 'REJECTED')"
            ),
            nullable=False,
        ),
        sa.Column("reviewed_by", sa.Uuid(as_uuid=True), sa.ForeignKey("users.id"), nullable=True),
        sa.Column("reviewed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("idx_mappings_status", "material_mappings", ["mapping_status"])

    # 9. Pooled Demands
    op.create_table(
        "pooled_demands",
        sa.Column(
            "id",
            sa.Uuid(as_uuid=True),
            primary_key=True,
            server_default=sa.text("uuid_generate_v4()") if is_postgres else None,
        ),
        sa.Column(
            "unified_master_id",
            sa.Uuid(as_uuid=True),
            sa.ForeignKey("unified_master_codes.id", ondelete="RESTRICT"),
            nullable=False,
        ),
        sa.Column("total_aggregate_quantity", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("participating_org_count", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("target_tender_month", sa.String(16), nullable=False),
        sa.Column(
            "status",
            sa.String(32),
            sa.CheckConstraint("status IN ('DRAFT', 'PUBLISHED_GEM', 'AWARDED')"),
            nullable=False,
            server_default="DRAFT",
        ),
        sa.Column("estimated_cost_inr", sa.Numeric(16, 2), nullable=False, server_default="0.00"),
        sa.Column("projected_savings_inr", sa.Numeric(16, 2), nullable=False, server_default="0.00"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    # 10. Audit Logs
    op.create_table(
        "audit_logs",
        sa.Column(
            "id",
            sa.Uuid(as_uuid=True),
            primary_key=True,
            server_default=sa.text("uuid_generate_v4()") if is_postgres else None,
        ),
        sa.Column("actor_id", sa.Uuid(as_uuid=True), sa.ForeignKey("users.id"), nullable=True),
        sa.Column("action", sa.String(64), nullable=False),
        sa.Column("entity_type", sa.String(64), nullable=False),
        sa.Column("entity_id", sa.Uuid(as_uuid=True), nullable=False),
        sa.Column("prior_state", json_type, nullable=True),
        sa.Column("new_state", json_type, nullable=False),
        sa.Column("sha256_hash", sa.String(64), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("idx_audit_entity", "audit_logs", ["entity_type", "entity_id"])


def downgrade() -> None:
    op.drop_table("audit_logs")
    op.drop_table("pooled_demands")
    op.drop_table("material_mappings")
    op.drop_table("duplicate_clusters")
    op.drop_table("unified_master_codes")
    op.drop_table("material_embeddings")
    op.drop_table("cleansed_materials")
    op.drop_table("raw_materials")
    op.drop_table("users")
    op.drop_table("organizations")
