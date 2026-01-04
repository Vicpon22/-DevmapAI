"""
Modelo de Material para armazenar PDFs, links e recursos complementares
"""
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base


class Material(Base):
    """
    Tabela de materiais complementares dos cursos
    
    Campos:
    - id: Identificador único
    - curso_id: ID do curso relacionado
    - titulo: Título do material
    - tipo: Tipo de material ("PDF", "Link", "Livro", "Vídeo")
    - conteudo: Texto ou URL do material
    - criado_em: Data de criação
    """
    __tablename__ = "materiais"
    
    id = Column(Integer, primary_key=True, index=True)
    curso_id = Column(Integer, ForeignKey("cursos.id"), nullable=False)
    titulo = Column(String, nullable=False)
    tipo = Column(String, nullable=False)  # "PDF", "Link", "Livro", "Vídeo"
    conteudo = Column(Text, nullable=False)  # Texto ou URL
    criado_em = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relacionamentos
    curso = relationship("Curso", back_populates="materiais")
    
    def __repr__(self):
        return f"<Material(id={self.id}, titulo='{self.titulo}', tipo='{self.tipo}')>"
