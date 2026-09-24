# ponytail: Standard declarative models with portable JSON/Vector types.
# Upgrade path: add table partitioning for 10M+ audit log scale.

import uuid

from sqlalchemy import (
    JSON,
    Boolean,
    CheckConstraint,
    Column,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    Numeric,
    String,
    Text,
    Uuid,
    func,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.types import TypeDecorator

try:
    from pgvector.sqlalchemy import Vector
except ImportError:
    Vector = None

Base = declarative_base()


class PortableVector(TypeDecorator):
    """
    Vector type decorator that generates pgvector Vector(1024) on PostgreSQL,
    and falls back to JSON on SQLite for local zero-Docker verification.
    """

    impl = JSON
    cache_ok = True

    def __init__(self, dim: int = 1024):
        super().__init__()
        self.dim = dim

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql" and Vector is not None:
            return dialect.type_descriptor(Vector(self.dim))
        return dialect.type_descriptor(JSON())


# Portable JSONB that compiles to JSONB on PostgreSQL and JSON on SQLite
PortableJSON = JSON().with_variant(JSONB, "postgresql")


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String(16), nullable=False, unique=True)
    name = Column(String(128), nullable=False)
    division = Column(String(64), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    users = relationship("User", back_populates="organization")
    raw_materials = relationship("RawMaterial", back_populates="organization")


class User(Base):
    __tablename__ = "users"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(Uuid(as_uuid=True), ForeignKey("organizations.id", ondelete="RESTRICT"), nullable=False)
    email = Column(String(128), nullable=False, unique=True)
    hashed_password = Column(String(256), nullable=False)
    full_name = Column(String(128), nullable=False)
    role = Column(
        String(32),
        CheckConstraint("role IN ('STEWARD', 'PROCUREMENT_OFFICER', 'ADMIN', 'AUDITOR')", name="ck_user_role"),
        nullable=False,
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    organization = relationship("Organization", back_populates="users")
    reviewed_mappings = relationship("MaterialMapping", back_populates="reviewer")
    audit_logs = relationship("AuditLog", back_populates="actor")


class RawMaterial(Base):
    __tablename__ = "raw_materials"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(Uuid(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    source_item_code = Column(String(64), nullable=False)
    plant_code = Column(String(32), nullable=False)
    plant_location = Column(String(128), nullable=False)
    raw_description = Column(Text, nullable=False)
    unit_price = Column(Numeric(14, 2), nullable=False, default=0.00)
    currency = Column(String(8), nullable=False, default="INR")
    stock_quantity = Column(Integer, nullable=False, default=0)
    uom = Column(String(16), nullable=False, default="EA")
    source_system = Column(String(32), nullable=False, default="SAP_ECC")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    organization = relationship("Organization", back_populates="raw_materials")
    cleansed_material = relationship(
        "CleansedMaterial", back_populates="raw_material", uselist=False, cascade="all, delete-orphan"
    )
    mapping = relationship(
        "MaterialMapping", back_populates="raw_material", uselist=False, cascade="all, delete-orphan"
    )

    __table_args__ = (
        Index("idx_raw_materials_org", "organization_id"),
        Index("idx_raw_materials_code", "source_item_code"),
    )


class CleansedMaterial(Base):
    __tablename__ = "cleansed_materials"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    raw_material_id = Column(
        Uuid(as_uuid=True), ForeignKey("raw_materials.id", ondelete="CASCADE"), nullable=False, unique=True
    )
    cleaned_description = Column(Text, nullable=False)
    item_class = Column(String(64), nullable=False)
    size_inch = Column(Numeric(6, 3), nullable=True)
    size_mm = Column(Integer, nullable=True)
    pressure_class = Column(Integer, nullable=True)
    metallurgy = Column(String(64), nullable=True)
    end_connection = Column(String(64), nullable=True)
    standards = Column(PortableJSON, nullable=False, default=list)
    parametric_attributes = Column(PortableJSON, nullable=False, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    raw_material = relationship("RawMaterial", back_populates="cleansed_material")
    embedding = relationship(
        "MaterialEmbedding", back_populates="cleansed_material", uselist=False, cascade="all, delete-orphan"
    )

    __table_args__ = (
        Index("idx_cleansed_class", "item_class"),
        Index("idx_cleansed_size", "size_inch"),
        Index("idx_cleansed_pressure", "pressure_class"),
        Index("idx_cleansed_gin", "parametric_attributes", postgresql_using="gin"),
    )


class MaterialEmbedding(Base):
    __tablename__ = "material_embeddings"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    cleansed_material_id = Column(
        Uuid(as_uuid=True), ForeignKey("cleansed_materials.id", ondelete="CASCADE"), nullable=False, unique=True
    )
    embedding_1024 = Column(PortableVector(1024), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    cleansed_material = relationship("CleansedMaterial", back_populates="embedding")

    __table_args__ = (
        # HNSW Cosine Index for fast 1024-dim nearest neighbor search
        Index(
            "idx_material_embeddings_hnsw",
            "embedding_1024",
            postgresql_using="hnsw",
            postgresql_with={"m": 16, "ef_construction": 64},
            postgresql_ops={"embedding_1024": "vector_cosine_ops"},
        ),
    )


class UnifiedMasterCode(Base):
    __tablename__ = "unified_master_codes"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    onmc_code = Column(String(128), nullable=False, unique=True)
    canonical_description = Column(Text, nullable=False)
    item_class = Column(String(64), nullable=False)
    size_inch = Column(Numeric(6, 3), nullable=True)
    pressure_class = Column(Integer, nullable=True)
    metallurgy = Column(String(64), nullable=True)
    end_connection = Column(String(64), nullable=True)
    shell_mesc_code = Column(String(32), nullable=True)
    mesc_spe_spec = Column(String(32), nullable=True)
    unspsc_code = Column(String(16), nullable=True)
    gem_category_id = Column(String(64), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    mappings = relationship("MaterialMapping", back_populates="unified_master")
    pooled_demands = relationship("PooledDemand", back_populates="unified_master")

    __table_args__ = (
        Index("idx_onmc_code", "onmc_code"),
        Index("idx_onmc_mesc", "shell_mesc_code"),
        Index("idx_onmc_unspsc", "unspsc_code"),
    )


class DuplicateCluster(Base):
    __tablename__ = "duplicate_clusters"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    cluster_hash = Column(String(64), nullable=False, unique=True)
    item_class = Column(String(64), nullable=False)
    item_count = Column(Integer, nullable=False, default=1)
    status = Column(
        String(32),
        CheckConstraint("status IN ('PENDING', 'RESOLVED', 'REJECTED')", name="ck_cluster_status"),
        nullable=False,
        default="PENDING",
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    mappings = relationship("MaterialMapping", back_populates="duplicate_cluster")


class MaterialMapping(Base):
    __tablename__ = "material_mappings"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    raw_material_id = Column(
        Uuid(as_uuid=True), ForeignKey("raw_materials.id", ondelete="CASCADE"), nullable=False, unique=True
    )
    unified_master_id = Column(
        Uuid(as_uuid=True), ForeignKey("unified_master_codes.id", ondelete="SET NULL"), nullable=True
    )
    duplicate_cluster_id = Column(
        Uuid(as_uuid=True), ForeignKey("duplicate_clusters.id", ondelete="SET NULL"), nullable=True
    )
    confidence_score = Column(Numeric(5, 4), nullable=False)
    lexical_similarity = Column(Numeric(5, 4), nullable=False)
    semantic_similarity = Column(Numeric(5, 4), nullable=False)
    rule_gate_passed = Column(Boolean, nullable=False, default=True)
    mapping_status = Column(
        String(32),
        CheckConstraint(
            "mapping_status IN ('AUTO_APPROVED', 'PENDING_REVIEW', 'MANUALLY_APPROVED', 'REJECTED', 'MINTED_NOVEL', 'OVERRIDDEN')",
            name="ck_mapping_status",
        ),
        nullable=False,
    )
    reviewed_by = Column(Uuid(as_uuid=True), ForeignKey("users.id"), nullable=True)
    reviewed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    raw_material = relationship("RawMaterial", back_populates="mapping")
    unified_master = relationship("UnifiedMasterCode", back_populates="mappings")
    duplicate_cluster = relationship("DuplicateCluster", back_populates="mappings")
    reviewer = relationship("User", back_populates="reviewed_mappings")

    __table_args__ = (Index("idx_mappings_status", "mapping_status"),)


class PooledDemand(Base):
    __tablename__ = "pooled_demands"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    unified_master_id = Column(
        Uuid(as_uuid=True), ForeignKey("unified_master_codes.id", ondelete="RESTRICT"), nullable=False
    )
    total_aggregate_quantity = Column(Integer, nullable=False, default=0)
    participating_org_count = Column(Integer, nullable=False, default=0)
    target_tender_month = Column(String(16), nullable=False)
    status = Column(
        String(32),
        CheckConstraint("status IN ('DRAFT', 'PUBLISHED_GEM', 'AWARDED')", name="ck_pooled_demand_status"),
        nullable=False,
        default="DRAFT",
    )
    estimated_cost_inr = Column(Numeric(16, 2), nullable=False, default=0.00)
    projected_savings_inr = Column(Numeric(16, 2), nullable=False, default=0.00)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    unified_master = relationship("UnifiedMasterCode", back_populates="pooled_demands")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    actor_id = Column(Uuid(as_uuid=True), ForeignKey("users.id"), nullable=True)
    action = Column(String(64), nullable=False)
    entity_type = Column(String(64), nullable=False)
    entity_id = Column(Uuid(as_uuid=True), nullable=False)
    prior_state = Column(PortableJSON, nullable=True)
    new_state = Column(PortableJSON, nullable=False)
    sha256_hash = Column(String(64), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    actor = relationship("User", back_populates="audit_logs")

    __table_args__ = (Index("idx_audit_entity", "entity_type", "entity_id"),)
