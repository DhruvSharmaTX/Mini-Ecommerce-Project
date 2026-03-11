from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.database.connection import Base, engine
from app.models import user_model, product_model, order_model, order_item_model
from app.routes import user_routes, product_routes, order_routes

app = FastAPI(
    title="Mini Ecommerce API",
    description="FastAPI Ecommerce Backend",
    version="1.0"
)

Base.metadata.create_all(bind=engine)

origins = ["*"]   # allow all for now

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_routes.router)
app.include_router(product_routes.router)
app.include_router(order_routes.router)
# serve frontend
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
