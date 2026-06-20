from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth
from app.api.teacher import router as teacher_router
from app.api.journal import router as journal_router
from app.database import init_db

app = FastAPI(title="GK Trader API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup() -> None:
    init_db()

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(teacher_router, prefix="/api/teacher", tags=["teacher"])
app.include_router(journal_router, prefix="/api/journal", tags=["journal"])

@app.get("/api/health")
def health_check() -> dict:
    return {"status": "ok"}
