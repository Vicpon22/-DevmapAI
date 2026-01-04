"""
Modelo de Usuário para autenticação e gestão de alunos
"""
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base


class Usuario(Base):
    """
    Tabela de usuários do sistema
    
    Campos:
    - id: Identificador único
    - email: E-mail único para login
    - senha: Hash da senha (bcrypt)
    - nome: Nome do usuário
    - criado_em: Data de criação da conta
    """
    __tablename__ = "usuarios"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    senha = Column(String, nullable=False)  # Hash bcrypt
    nome = Column(String, nullable=False)
    criado_em = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relacionamentos
    duvidas = relationship("Duvida", back_populates="usuario", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Usuario(id={self.id}, email='{self.email}', nome='{self.nome}')>"
