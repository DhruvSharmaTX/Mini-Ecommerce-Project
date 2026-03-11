from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schemas.product_schema import ProductCreate, ProductUpdate
from app.services import product_service

router = APIRouter()  # no prefix here

@router.post("/")
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    return product_service.create_product(db, product)

@router.get("/")
def get_all_products(db: Session = Depends(get_db)):
    return product_service.get_all_products(db)

@router.get("/{product_id}")
def get_product_by_id(product_id: str, db: Session = Depends(get_db)):
    return product_service.get_product_by_id(db, product_id)

@router.put("/{product_id}")
def update_product(product_id: str, product: ProductUpdate, db: Session = Depends(get_db)):
    return product_service.update_product(db, product_id, product)