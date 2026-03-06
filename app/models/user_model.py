from sqlalchemy import Column,String
from app.database.connection import Base
class User(Base):
    __tablename__="users"
    id=Column(String(50), primary_key=True,unique=True)
    name=Column(String(50))
    email=Column(String(50),unique=True)
