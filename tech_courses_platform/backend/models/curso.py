"""
Modelo de Curso para armazenar roadmaps e conteúdos gerados pela IA
"""
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base


class Curso(Base):
    """
    Tabela de cursos gerados pela IA
    
    Campos:
    - id: Identificador único
    - titulo: Título do curso (ex: "Inteligência Artificial para Iniciantes")
    - descricao: Descrição breve do curso
    - roadmap: Conteúdo completo em Markdown (módulos, tópicos, projetos)
    - duracao: Duração estimada (ex: "8 semanas")
    - criado_em: Data de criação
    """
    __tablename__ = "cursos"
    
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, index=True, nullable=False)
    descricao = Column(Text)
    roadmap = Column(Text, nullable=False)  # Markdown gerado pela IA
    duracao = Column(String)  # Ex: "8 semanas"
    criado_em = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relacionamentos
    materiais = relationship("Material", back_populates="curso", cascade="all, delete-orphan")
    duvidas = relationship("Duvida", back_populates="curso", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Curso(id={self.id}, titulo='{self.titulo}', duracao='{self.duracao}')>"
