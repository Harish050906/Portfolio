import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Harish Portfolio API"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "postgresql+asyncpg://postgres:postgres@localhost:5432/portfolio"
    )
    
    # GitHub username for fetching live repositories if requested
    GITHUB_USERNAME: str = os.getenv("GITHUB_USERNAME", "Harish050906")
    GITHUB_TOKEN: str = os.getenv("GITHUB_TOKEN", "")
    
    # CORS Origins
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",  # Vite local
        "http://localhost:3000",
        "http://localhost",
        "https://harish-portfolio.onrender.com",  # Placeholder, will be added dynamically or wildcarded for ease of deploy
        "*",
    ]

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
