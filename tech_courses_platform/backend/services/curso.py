"""
Serviço para gerenciamento de cursos
"""
from sqlalchemy.orm import Session
from models.curso import Curso
from models.material import Material
from services.ia import gerar_roadmap
from typing import List, Optional


def criar_curso(db: Session, tema: str) -> Curso:
    """
    Cria novo curso gerando roadmap com IA
    
    Args:
        db: Sessão do banco de dados
        tema: Tema do curso
        
    Returns:
        Curso: Curso criado
    """
    # Gera roadmap com IA
    roadmap = gerar_roadmap(tema)
    
    # Cria descrição
    descricao = f"Curso completo de {tema} com roadmap detalhado, projetos práticos e materiais complementares."
    
    # Cria curso
    curso = Curso(
        titulo=tema,
        descricao=descricao,
        roadmap=roadmap,
        duracao="8 semanas"
    )
    
    db.add(curso)
    db.commit()
    db.refresh(curso)
    
    # Cria materiais complementares automaticamente
    criar_materiais_padrao(db, curso.id, tema)
    
    return curso


def criar_materiais_padrao(db: Session, curso_id: int, tema: str):
    """
    Cria materiais complementares padrão para um curso
    
    Args:
        db: Sessão do banco de dados
        curso_id: ID do curso
        tema: Tema do curso
    """
    materiais = [
        Material(
            curso_id=curso_id,
            titulo=f"Documentação Oficial - {tema}",
            tipo="Link",
            conteudo=f"https://docs.exemplo.com/{tema.lower().replace(' ', '-')}"
        ),
        Material(
            curso_id=curso_id,
            titulo=f"Livro: Dominando {tema}",
            tipo="Livro",
            conteudo=f"Guia completo e prático sobre {tema}, desde conceitos básicos até tópicos avançados."
        ),
        Material(
            curso_id=curso_id,
            titulo=f"Playlist de Vídeos - {tema}",
            tipo="Vídeo",
            conteudo=f"https://youtube.com/playlist?exemplo_{tema.lower().replace(' ', '_')}"
        ),
        Material(
            curso_id=curso_id,
            titulo=f"Comunidade no Discord - {tema}",
            tipo="Link",
            conteudo="https://discord.gg/exemplo-tech-community"
        )
    ]
    
    for material in materiais:
        db.add(material)
    
    db.commit()


def listar_cursos(db: Session, skip: int = 0, limit: int = 100) -> List[Curso]:
    """
    Lista todos os cursos
    
    Args:
        db: Sessão do banco de dados
        skip: Número de registros a pular
        limit: Número máximo de registros
        
    Returns:
        List[Curso]: Lista de cursos
    """
    return db.query(Curso).offset(skip).limit(limit).all()


def obter_curso(db: Session, curso_id: int) -> Optional[Curso]:
    """
    Obtém curso por ID
    
    Args:
        db: Sessão do banco de dados
        curso_id: ID do curso
        
    Returns:
        Curso | None: Curso encontrado ou None
    """
    return db.query(Curso).filter(Curso.id == curso_id).first()


def deletar_curso(db: Session, curso_id: int) -> bool:
    """
    Deleta curso por ID
    
    Args:
        db: Sessão do banco de dados
        curso_id: ID do curso
        
    Returns:
        bool: True se deletado, False se não encontrado
    """
    curso = db.query(Curso).filter(Curso.id == curso_id).first()
    if not curso:
        return False
    
    db.delete(curso)
    db.commit()
    return True
