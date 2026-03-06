from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schemas import order_schema
from app.services import order_service
router = APIRouter(prefix="/orders", tags=["Orders"])
@router.post("/")
def create_order(order: order_schema.OrderCreate, db: Session = Depends(get_db)):
    return order_service.create_order(db, order)
@router.get("/")
def get_all_orders(db: Session = Depends(get_db)):
    return order_service.get_orders(db)
@router.get("/{order_id}", response_model=order_schema.OrderResponse)
def get_order(order_id: str, db: Session = Depends(get_db)):
    return order_service.get_order_by_id(db, order_id)
@router.put("/{order_id}/status")
def update_status(order_id: str, status: str, db: Session = Depends(get_db)):
    return order_service.update_order_status(db, order_id, status)
@router.put("/{order_id}/cancel")
def cancel_order(order_id: str, db: Session = Depends(get_db)):
    return order_service.cancel_order(db, order_id)