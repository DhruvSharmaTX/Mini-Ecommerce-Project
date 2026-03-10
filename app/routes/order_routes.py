from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schemas import order_schema
from app.services import order_service
router = APIRouter(tags=["Orders"])
@router.post("/orders")
def create_order(order: order_schema.OrderCreate, db: Session = Depends(get_db)):
    return order_service.create_order(db, order)
@router.get("/orders")
def get_all_orders(db: Session = Depends(get_db)):
    return order_service.get_orders(db)
@router.get("/orders/{order_id}", response_model=order_schema.OrderResponse)
def get_order(order_id: str, db: Session = Depends(get_db)):
    return order_service.get_order_by_id(db, order_id)
@router.put("/orders/{order_id}/status")
def update_status(order_id: str, payload: dict, db: Session = Depends(get_db)):
    status = payload.get("status")
    return order_service.update_order_status(db, order_id, status)
@router.put("/orders/{order_id}/cancel")
def cancel_order_route(order_id: str, db: Session = Depends(get_db)):
    return order_service.cancel_order(db, order_id)