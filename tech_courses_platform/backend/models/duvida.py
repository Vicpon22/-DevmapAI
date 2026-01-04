"""
Modelo de Dúvida para armazenar perguntas e respostas da IA
"""
from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base


class Duvida(Base):
    """
    Tabela de dúvidas dos alunos e respostas da IA
    
    Campos:
    - id: Identificador único
    - usuario_id: ID do usuário que perguntou
    - curso_id: ID do curso relacionado
    - pergunta: Pergunta do aluno
    - resposta: Resposta gerada pela IA
    - criada_em: Data/hora da pergunta
    """
    __tablename__ = "duvidas"
    
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    curso_id = Column(Integer, ForeignKey("cursos.id"), nullable=False)
    pergunta = Column(Text, nullable=False)
    resposta = Column(Text, nullable=False)
    criada_em = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relacionamentos
    usuario = relationship("Usuario", back_populates="duvidas")
    curso = relationship("Curso", back_populates="duvidas")
    
    def __repr__(self):
        return f"<Duvida(id={self.id}, usuario_id={self.usuario_id}, curso_id={self.curso_id})>"
