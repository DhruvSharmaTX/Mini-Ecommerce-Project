from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schemas import user_schema
from app.services import user_service

router = APIRouter(tags=["Users"])  # no prefix here

@router.post("/")
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    return user_service.create_user(db, user)

@router.get("/")
def get_all_users(db: Session = Depends(get_db)):
    return user_service.get_all_users(db)

@router.get("/{user_id}")
def get_user(user_id: str, db: Session = Depends(get_db)):
    return user_service.get_user_by_id(db, user_id)