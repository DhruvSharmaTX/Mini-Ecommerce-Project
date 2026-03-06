from sqlalchemy.orm import Session
from app.models.user_model import User
from app.schemas.user_schema import UserCreate
from app.utils.id_generator import generate_id
def create_user(db:Session,user:UserCreate):
    new_user=User(id=generate_id("USR"),name=user.name,email=user.email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
def get_all_users(db: Session):
    return db.query(User).all()
def get_user_by_id(db: Session, user_id: str):
    return db.query(User).filter(User.id == user_id).first()