from sqlalchemy.orm import Session
from app.models.order_model import Order
from app.models.order_item_model import OrderItem
from app.models.product_model import Product
from app.models.user_model import User
from app.schemas.order_schema import OrderCreate
from app.utils.id_generator import generate_id
from fastapi import HTTPException

def create_order(db: Session, order: OrderCreate):
    user = db.query(User).filter(User.id == order.user_id).first()
    if not user:
        return {"message": "User not found"}
    if not order.items:
        return {"message": "Order must contain at least one product"}
    total_amount = 0
    new_order = Order(
        id=generate_id("ORD"),
        user_id=order.user_id,
        total_amount=0,
        status="PENDING"
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    for item in order.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            return {"message": f"Product {item.product_id} not found"}
        if product.stock_quantity < item.quantity:
            return {"message": f"Not enough stock for {product.name}"}
        item_total = product.price * item.quantity
        total_amount += item_total
        new_item = OrderItem(
            id=generate_id("ITEM"),
            order_id=new_order.id,
            product_id=product.id,
            product_name=product.name,
            quantity=item.quantity,
            price=product.price
        )
        db.add(new_item)
        product.stock_quantity -= item.quantity
    new_order.total_amount = total_amount
    db.commit()
    db.refresh(new_order)
    return new_order

def get_orders(db: Session):
    return db.query(Order).all()

def get_order_by_id(db: Session, order_id: str):
    return db.query(Order).filter(Order.id == order_id).first()

def cancel_order(db: Session, order_id: str):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order.status == "PENDING":
        order.status = "CANCELLED"
        db.commit()
        db.refresh(order)
        return {"success": True, "message": f"Order {order.id} cancelled"}
    else:
        # Cannot cancel SHIPPED or DELIVERED
        raise HTTPException(status_code=400, detail=f"Cannot cancel order with status {order.status}")

def update_order_status(db: Session, order_id: str, status: str):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order.status = status
    db.commit()
    db.refresh(order)
    return {"success": True, "message": f"Order {order.id} status updated to {status}"}