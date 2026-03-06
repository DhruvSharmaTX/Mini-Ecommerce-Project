from sqlalchemy.orm import Session
from app.models.order_item_model import OrderItem
from app.utils.id_generator import generate_id


def create_order_item(
    db: Session,
    order_id: str,
    product_id: str,
    product_name: str,
    quantity: int,
    price: float
):

    new_item = OrderItem(
        id=generate_id("ITEM"),
        order_id=order_id,
        product_id=product_id,
        product_name=product_name,
        quantity=quantity,
        price=price
    )

    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    return new_item


def get_items_by_order(db: Session, order_id: str):

    return db.query(OrderItem).filter(
        OrderItem.order_id == order_id
    ).all()


def delete_order_item(db: Session, item_id: str):

    item = db.query(OrderItem).filter(
        OrderItem.id == item_id
    ).first()

    if not item:
        return {"message": "Order item not found"}

    db.delete(item)
    db.commit()

    return {"message": "Order item deleted"}