# app/database/connection.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Use DATABASE_URL from environment or fallback for local
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://dhruv_341o_user:hSmXqgSUOuQYColfHCIqKrS0ob5Zg0kw@dpg-d6og68fafjfc73864pvg-a.oregon-postgres.render.com/dhruv_341o"
)

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL, echo=False)  # echo=True for debug queries

# Create session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for models
Base = declarative_base()

# Dependency for FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()