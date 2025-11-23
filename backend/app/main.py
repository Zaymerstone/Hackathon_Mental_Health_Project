from fastapi import FastAPI
from app.database import engine
from app import models

# --- Create tables in DB (early development only) ---
models.Base.metadata.create_all(bind=engine)

# --- FastAPI app instance ---
app = FastAPI(
    title="ListenLab Backend",
    description="Backend for ListenLab: Chat between psychology students and patients",
    version="0.1.0"
)

# --- Health check endpoint ---
@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "ListenLab backend is running!"}
