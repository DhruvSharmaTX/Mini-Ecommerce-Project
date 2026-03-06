from sqlalchemy import Column,String,Float,Integer
from app.database.connection import Base
class Product(Base):
    __tablename__="products"
    id=Column(String(50),primary_key=True,unique=True)
    name=Column(String(50))
    price=Column(Float)
    stock_quantity=Column(Integer)