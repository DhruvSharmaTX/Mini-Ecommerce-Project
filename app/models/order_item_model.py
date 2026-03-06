from sqlalchemy import Column, String, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database.connection import Base
class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(String(50), primary_key=True, unique=True)
    order_id = Column(String(50), ForeignKey("orders.id"))
    product_id = Column(String(50), ForeignKey("products.id"))
    product_name = Column(String(100))
    quantity = Column(Integer)
    price = Column(Float)
    order = relationship("Order", back_populates="items")