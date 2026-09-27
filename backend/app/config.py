import os

class Settings:
    PROJECT_NAME: str = "PackZen AI"
    VERSION: str = "2.4.0"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "packzen-local-development-secret-change-me")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:////tmp/packsmart.db" if os.getenv("VERCEL") else "sqlite:///./packsmart.db"
    )
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]

settings = Settings()
