import time
import httpx
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.config import settings
from app.database import get_db

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for Harish A. Portfolio",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static achievements payload
ACHIEVEMENTS_DATA = [
    {
        "id": "cukcs_aithon_2026",
        "title": "1st Prize Winner - CUKCS-AITHON 2026",
        "organization": "Central University of Karnataka, Kalaburagi",
        "team": "Team LuminaX",
        "project": "De-Disabled",
        "description": "Secured 1st place in a competitive 24-hour national hackathon. Developed an accessibility platform featuring an intelligent visual eye-tracking and voice system, enabling physically disabled users to independently cast votes and perform tasks like reading books.",
        "image_path": "/assets/images/hackathons/cukcs_2026.jpg",
        "date": "2026",
        "category": "Hackathon"
    },
    {
        "id": "iiitd_productathon_2025",
        "title": "Finalist - IIITD Productathon 2025",
        "organization": "IIIT Delhi, New Delhi",
        "team": "SmartGrid Devs",
        "project": "Smart Grid & Electricity Monitor",
        "description": "Designed and deployed a smart home grid system to monitor electricity bills and track consumption. Integrated solar power systems to optimize household energy usage and reduce overall grid reliance and costs.",
        "image_path": "/assets/images/hackathons/iiitd_2025.jpg",
        "date": "2025",
        "category": "Productathon"
    }
]

# Static fallback repositories data matching Harish's portfolio profile
FEATURED_REPOSITORIES = [
    {
        "name": "De-Disabled",
        "description": "An intelligent accessibility system tailored for handless or physically disabled individuals. Enabled hands-free, independent voting through webcam-based head movement control and voice activation.",
        "html_url": f"https://github.com/{settings.GITHUB_USERNAME}/De-disable",
        "topics": ["opencv", "lstm", "speech-recognition", "expressjs", "accessibility", "python"],
        "stars": 12,
        "forks": 3,
        "language": "Python / JavaScript"
    },
    {
        "name": "Vikram",
        "description": "A voice-activated Android application built using the LiveKit SDK and Android Studio to facilitate high-speed WebRTC real-time audio interaction powered by LLM routing.",
        "html_url": f"https://github.com/{settings.GITHUB_USERNAME}/vikram",
        "topics": ["android", "livekit-sdk", "python", "webrtc"],
        "stars": 8,
        "forks": 2,
        "language": "Python"
    },
    {
        "name": "PeerHealth",
        "description": "A robust disease surveillance platform utilizing FastAPI backend, PostGIS spatial queries, and PostgreSQL to track, analyze and map regional disease outbreaks.",
        "html_url": f"https://github.com/{settings.GITHUB_USERNAME}/PeerHealth",
        "topics": ["express-js", "python", "ml"],
        "stars": 15,
        "forks": 4,
        "language": "Python"
    }
]

# Cache container for /api/repos
repos_cache = {
    "data": None,
    "last_updated": 0
}
CACHE_DURATION_SECONDS = 3600  # Cache for 1 hour

@app.get("/api/health")
async def health_check(db: AsyncSession = Depends(get_db)):
    """
    Enhanced Health check that verifies server status and database connectivity (with PostGIS validation).
    """
    db_status = "unconnected"
    postgis_version = "not installed"
    
    try:
        # Check connection
        result = await db.execute(text("SELECT 1"))
        if result.scalar() == 1:
            db_status = "connected"
            
        # Check if PostGIS is installed and fetch version
        gis_result = await db.execute(text("SELECT PostGIS_Full_Version()"))
        postgis_version = gis_result.scalar()
    except Exception as e:
        db_status = f"error: {str(e)}"
        
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "database": {
            "status": db_status,
            "postgis": postgis_version
        },
        "timestamp": time.time()
    }

@app.get("/api/achievements")
async def get_achievements():
    """
    Returns an immutable payload of verified hackathon wins, team roles, and static image asset paths.
    """
    return ACHIEVEMENTS_DATA

@app.get("/api/repos")
async def get_repos():
    """
    Returns cached JSON array containing featured software engineering and ML repository data.
    If GitHub API token is provided, fetches from GitHub, otherwise returns curated static repos.
    """
    now = time.time()
    if repos_cache["data"] and (now - repos_cache["last_updated"] < CACHE_DURATION_SECONDS):
        return repos_cache["data"]
        
    # If a GitHub token or just username is available, we try to fetch live stats and merge
    merged_repos = list(FEATURED_REPOSITORIES)
    
    try:
        headers = {}
        if settings.GITHUB_TOKEN:
            headers["Authorization"] = f"token {settings.GITHUB_TOKEN}"
            
        async with httpx.AsyncClient(timeout=5.0) as client:
            # Let's try to query github API for Harish's public repos
            url = f"https://api.github.com/users/{settings.GITHUB_USERNAME}/repos"
            response = await client.get(url, headers=headers)
            
            if response.status_code == 200:
                github_repos = response.json()
                # Create a map for easy lookup
                github_map = {r["name"].lower(): r for r in github_repos}
                
                # Merge star counts and forks from live GitHub data if found
                for repo in merged_repos:
                    name_lower = repo["name"].lower()
                    if name_lower in github_map:
                        repo["stars"] = github_map[name_lower].get("stargazers_count", repo["stars"])
                        repo["forks"] = github_map[name_lower].get("forks_count", repo["forks"])
                        if github_map[name_lower].get("html_url"):
                            repo["html_url"] = github_map[name_lower]["html_url"]
    except Exception as e:
        # Silently fail and fallback to static counts if GitHub API is offline/rate limited
        pass

    repos_cache["data"] = merged_repos
    repos_cache["last_updated"] = now
    return merged_repos
