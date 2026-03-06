from pydantic import BaseModel
from typing import Optional
class ProductCreate(BaseModel):
    name:str
    price:float
    stock_quantity:int
class ProductUpdate(BaseModel):
    price: Optional[float] = None
    stock_quantity: Optional[int] = None
class ProductResponse(BaseModel):
    id:str
    name:str
    price:float
    stock_quantity:int
    class Config:
        from_attributes=True
        