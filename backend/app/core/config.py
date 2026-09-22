# ponytail: Direct pydantic-settings config with automatic SQLite fallback for zero-Docker dev.
# Upgrade path: add Vault / AWS Secrets Manager provider.
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "National Unified Material Master (NUMM)"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"

    # Database configuration
    USE_SQLITE: bool = False
    POSTGRES_USER: str = "numm_admin"
    POSTGRES_PASSWORD: str = ""
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str = "numm_master"
    
    CORS_ORIGINS: list[str] = ["http://localhost:3000"]

    # SQLite fallback file
    SQLITE_DB_PATH: str = "./numm_dev.db"

    # Redis configuration
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def async_database_url(self) -> str:
        if self.USE_SQLITE:
            return f"sqlite+aiosqlite:///{self.SQLITE_DB_PATH}"
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    @property
    def sync_database_url(self) -> str:
        if self.USE_SQLITE:
            return f"sqlite:///{self.SQLITE_DB_PATH}"
        return f"postgresql+psycopg2://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    @property
    def redis_url(self) -> str:
        return f"redis://{self.REDIS_HOST}:{self.REDIS_PORT}/0"


settings = Settings()
