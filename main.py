from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.database.connection import Base, engine
from app.routes import user_routes, product_routes, order_routes

app = FastAPI(
    title="Mini Ecommerce API",
    description="FastAPI Ecommerce Backend",
    version="1.0"
)

# Create tables if not exist
Base.metadata.create_all(bind=engine)

# --- CORS Middleware ---
# For testing, allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://mini-ecommerce-project-m23b.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Include routers ---
app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(product_routes.router, prefix="/products", tags=["Products"])
app.include_router(order_routes.router, prefix="/orders", tags=["Orders"])

# --- Serve frontend ---
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")

# --- Health check ---
@app.get("/healthz")
def health_check():
    return {"status": "ok"}