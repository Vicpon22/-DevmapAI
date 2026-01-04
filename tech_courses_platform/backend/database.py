"""
Configuração do banco de dados SQLAlchemy
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator
import os

# URL do banco de dados (SQLite para desenvolvimento, PostgreSQL para produção)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./tech_courses.db")

# Criar engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

# Criar SessionLocal
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator[Session, None, None]:
    """
    Dependency para obter sessão do banco de dados
    
    Yields:
        Session: Sessão do SQLAlchemy
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """
    Inicializa o banco de dados criando todas as tabelas
    """
    from models import Base
    Base.metadata.create_all(bind=engine)
