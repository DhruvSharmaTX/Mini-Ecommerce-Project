from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import time

DATABASE_URL = "mysql+pymysql://root:Password@mysql:3306/ecommerce"

engine = None
for i in range(10):
    try:
        engine = create_engine(DATABASE_URL, echo=False)
        conn = engine.connect()
        conn.close()
        print("✅ Connected to MySQL")
        break
    except Exception as e:
        print("⏳ Waiting for MySQL...")
        time.sleep(3)
if engine is None:
    raise Exception("❌ Could not connect to MySQL")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()