import os
from typing import Optional
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""

    # Redis
    redis_url: str = Field(default="redis://localhost:6379/0", alias="REDIS_URL")

    # MongoDB
    mongodb_uri: str = Field(
        default="mongodb://admin:password@localhost:27017/harvestiq?authSource=admin",
        alias="MONGODB_URI",
    )

    # API
    api_base_url: str = Field(default="http://localhost:4000", alias="API_BASE_URL")
    scraper_secret: str = Field(
        default="your_scraper_shared_secret_min_32_chars", alias="SCRAPER_SECRET"
    )

    # Google Sheets
    google_sheets_id: Optional[str] = Field(default=None, alias="GOOGLE_SHEETS_ID")
    google_credentials_path: str = Field(
        default="./config/service-account.json",
        alias="GOOGLE_CREDENTIALS_PATH",
    )

    # Browser Pool
    max_browsers: int = Field(default=5, alias="MAX_BROWSERS")
    context_ttl: int = Field(default=300, alias="CONTEXT_TTL")
    page_timeout: int = Field(default=30000, alias="PAGE_TIMEOUT")

    # Delays
    default_delay_min: float = Field(default=1.0, alias="DEFAULT_DELAY_MIN")
    default_delay_max: float = Field(default=5.0, alias="DEFAULT_DELAY_MAX")

    # Environment
    environment: str = Field(default="development", alias="PYTHON_ENV")
    debug: bool = Field(default=False, alias="DEBUG")

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
