"""
Serviço para gerenciamento de dúvidas e respostas da IA
"""
from sqlalchemy.orm import Session
from models.duvida import Duvida
from models.curso import Curso
from models.usuario import Usuario
from services.ia import responder_duvida as responder_com_ia
from typing import List, Optional


def criar_duvida(
    db: Session,
    usuario_id: int,
    curso_id: int,
    pergunta: str
) -> Duvida:
    """
    Cria nova dúvida e gera resposta com IA
    
    Args:
        db: Sessão do banco de dados
        usuario_id: ID do usuário
        curso_id: ID do curso
        pergunta: Pergunta do aluno
        
    Returns:
        Duvida: Dúvida criada com resposta
    """
    # Obtém contexto do curso
    curso = db.query(Curso).filter(Curso.id == curso_id).first()
    if not curso:
        raise ValueError("Curso não encontrado")
    
    # Gera resposta com IA
    contexto = f"{curso.titulo} - {curso.descricao}"
    resposta = responder_com_ia(pergunta, contexto)
    
    # Cria dúvida
    duvida = Duvida(
        usuario_id=usuario_id,
        curso_id=curso_id,
        pergunta=pergunta,
        resposta=resposta
    )
    
    db.add(duvida)
    db.commit()
    db.refresh(duvida)
    return duvida


def listar_duvidas_curso(
    db: Session,
    curso_id: int,
    skip: int = 0,
    limit: int = 100
) -> List[Duvida]:
    """
    Lista dúvidas de um curso
    
    Args:
        db: Sessão do banco de dados
        curso_id: ID do curso
        skip: Número de registros a pular
        limit: Número máximo de registros
        
    Returns:
        List[Duvida]: Lista de dúvidas
    """
    return db.query(Duvida)\
        .filter(Duvida.curso_id == curso_id)\
        .offset(skip)\
        .limit(limit)\
        .all()


def listar_duvidas_usuario(
    db: Session,
    usuario_id: int,
    skip: int = 0,
    limit: int = 100
) -> List[Duvida]:
    """
    Lista dúvidas de um usuário
    
    Args:
        db: Sessão do banco de dados
        usuario_id: ID do usuário
        skip: Número de registros a pular
        limit: Número máximo de registros
        
    Returns:
        List[Duvida]: Lista de dúvidas
    """
    return db.query(Duvida)\
        .filter(Duvida.usuario_id == usuario_id)\
        .offset(skip)\
        .limit(limit)\
        .all()


def obter_duvida(db: Session, duvida_id: int) -> Optional[Duvida]:
    """
    Obtém dúvida por ID
    
    Args:
        db: Sessão do banco de dados
        duvida_id: ID da dúvida
        
    Returns:
        Duvida | None: Dúvida encontrada ou None
    """
    return db.query(Duvida).filter(Duvida.id == duvida_id).first()
