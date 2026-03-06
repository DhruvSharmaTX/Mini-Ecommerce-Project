from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database.connection import Base
from datetime import datetime
class Order(Base):
    __tablename__ = "orders"
    id = Column(String(50), primary_key=True, unique=True)
    user_id = Column(String(50), ForeignKey("users.id"))
    total_amount = Column(Float)
    status = Column(String(50), default="PENDING")
    created_at = Column(DateTime, default=datetime.utcnow)
    items = relationship("OrderItem", back_populates="order")