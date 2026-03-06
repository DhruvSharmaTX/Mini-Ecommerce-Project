from sqlalchemy.orm import Session
from app.models.product_model import Product
from app.schemas.product_schema import ProductCreate
from app.schemas.product_schema import ProductUpdate
from app.utils.id_generator import generate_id
def create_product(db: Session, product: ProductCreate):
    new_product = Product(id = generate_id("PRD"),name=product.name,price=product.price,stock_quantity=product.stock_quantity)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product
def get_all_products(db: Session):
    return db.query(Product).all()
def get_product_by_id(db: Session, product_id: str):
    return db.query(Product).filter(Product.id == product_id).first()
def update_product(db: Session, product_id: str, product: ProductUpdate):
    existing_product = db.query(Product).filter(Product.id == product_id).first()
    if not existing_product:
        return {"message": "Product not found"}
    if product.price is not None:
        existing_product.price = product.price
    if product.stock_quantity is not None:
        existing_product.stock_quantity = product.stock_quantity
    db.commit()
    db.refresh(existing_product)
    return existing_product