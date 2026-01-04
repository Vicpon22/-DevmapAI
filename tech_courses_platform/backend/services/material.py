"""
Serviço para gerenciamento de materiais e geração de PDFs
"""
from sqlalchemy.orm import Session
from models.material import Material
from models.curso import Curso
from typing import List, Optional
import io


def listar_materiais(db: Session, curso_id: int) -> List[Material]:
    """
    Lista materiais de um curso
    
    Args:
        db: Sessão do banco de dados
        curso_id: ID do curso
        
    Returns:
        List[Material]: Lista de materiais
    """
    return db.query(Material).filter(Material.curso_id == curso_id).all()


def criar_material(
    db: Session,
    curso_id: int,
    titulo: str,
    tipo: str,
    conteudo: str
) -> Material:
    """
    Cria novo material
    
    Args:
        db: Sessão do banco de dados
        curso_id: ID do curso
        titulo: Título do material
        tipo: Tipo ("PDF", "Link", "Livro", "Vídeo")
        conteudo: Conteúdo ou URL
        
    Returns:
        Material: Material criado
    """
    material = Material(
        curso_id=curso_id,
        titulo=titulo,
        tipo=tipo,
        conteudo=conteudo
    )
    db.add(material)
    db.commit()
    db.refresh(material)
    return material


def buscar_materiais_externos(tema: str) -> list:
    """
    Busca materiais externos relacionados ao tema
    
    Args:
        tema: Tema do curso
        
    Returns:
        list: Lista de materiais externos
    """
    # Simulação de busca em APIs públicas
    materiais = [
        {
            "tipo": "Livro",
            "titulo": f"Livro Avançado sobre {tema}",
            "link": f"https://exemplo.com/livros/{tema.lower().replace(' ', '-')}"
        },
        {
            "tipo": "Vídeo",
            "titulo": f"Curso Gratuito de {tema}",
            "link": f"https://youtube.com/watch?v=exemplo_{tema.lower().replace(' ', '_')}"
        },
        {
            "tipo": "Artigo",
            "titulo": f"Guia Completo de {tema}",
            "link": f"https://medium.com/@exemplo/{tema.lower().replace(' ', '-')}-guide"
        },
        {
            "tipo": "Documentação",
            "titulo": f"Documentação Oficial - {tema}",
            "link": f"https://docs.exemplo.com/{tema.lower().replace(' ', '-')}"
        }
    ]
    return materiais


def gerar_pdf_simples(conteudo: str, titulo: str) -> bytes:
    """
    Gera PDF simples do conteúdo (versão básica sem dependências pesadas)
    
    Args:
        conteudo: Conteúdo em texto/Markdown
        titulo: Título do documento
        
    Returns:
        bytes: Bytes do PDF
    """
    try:
        # Tenta usar reportlab se disponível
        from reportlab.lib.pagesizes import letter, A4
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import inch
        from reportlab.lib.enums import TA_CENTER, TA_LEFT
        
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4)
        story = []
        styles = getSampleStyleSheet()
        
        # Estilo do título
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor='darkblue',
            spaceAfter=30,
            alignment=TA_CENTER
        )
        
        # Adiciona título
        story.append(Paragraph(titulo, title_style))
        story.append(Spacer(1, 0.3 * inch))
        
        # Processa conteúdo linha por linha
        linhas = conteudo.split('\n')
        for linha in linhas:
            linha = linha.strip()
            if not linha:
                story.append(Spacer(1, 0.1 * inch))
                continue
            
            # Detecta headers Markdown
            if linha.startswith('# '):
                story.append(Paragraph(linha[2:], styles['Heading1']))
            elif linha.startswith('## '):
                story.append(Paragraph(linha[3:], styles['Heading2']))
            elif linha.startswith('### '):
                story.append(Paragraph(linha[4:], styles['Heading3']))
            elif linha.startswith('**') and linha.endswith('**'):
                # Negrito
                story.append(Paragraph(f"<b>{linha[2:-2]}</b>", styles['Normal']))
            elif linha.startswith('- ') or linha.startswith('* '):
                # Lista
                story.append(Paragraph(f"• {linha[2:]}", styles['Normal']))
            else:
                # Texto normal
                story.append(Paragraph(linha, styles['Normal']))
        
        doc.build(story)
        return buffer.getvalue()
        
    except ImportError:
        # Fallback: retorna HTML simples se reportlab não estiver disponível
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>{titulo}</title>
            <style>
                body {{ font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }}
                h1 {{ color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }}
                h2 {{ color: #34495e; margin-top: 30px; }}
                h3 {{ color: #7f8c8d; }}
                pre {{ background: #f4f4f4; padding: 15px; border-radius: 5px; }}
            </style>
        </head>
        <body>
            <h1>{titulo}</h1>
            <pre>{conteudo}</pre>
        </body>
        </html>
        """
        return html_content.encode('utf-8')


def gerar_pdf(conteudo: str, titulo: str) -> bytes:
    """
    Gera PDF do conteúdo
    
    Args:
        conteudo: Conteúdo em Markdown
        titulo: Título do documento
        
    Returns:
        bytes: Bytes do PDF gerado
    """
    return gerar_pdf_simples(conteudo, titulo)
