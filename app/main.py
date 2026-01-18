from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.api import api_router
from app.core.config import settings
from app.db.session import engine
from app.models import Base

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        # This creates tables if they don't exist
        # Better to use Alembic in production
        await conn.run_sync(Base.metadata.create_all)

@app.get("/", tags=["health"])
async def health_check():
    return {
        "status": "online",
        "name": settings.PROJECT_NAME,
        "version": settings.VERSION
    }
