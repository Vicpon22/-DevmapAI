"""
API Principal - Tech Courses Platform
Plataforma de cursos de tecnologia com IA integrada
"""
from fastapi import FastAPI, Depends, HTTPException, status, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import timedelta

# Imports locais
from database import get_db, init_db
from models.usuario import Usuario
from models.curso import Curso
from models.material import Material
from models.duvida import Duvida
from services import auth, curso as curso_service, material as material_service, duvida as duvida_service

# Inicializa FastAPI
app = FastAPI(
    title="Tech Courses Platform API",
    description="API para plataforma de cursos de tecnologia com IA",
    version="1.0.0"
)

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especificar domínios
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Schemas Pydantic
class UsuarioCreate(BaseModel):
    email: EmailStr
    password: str
    nome: str


class UsuarioResponse(BaseModel):
    id: int
    email: str
    nome: str
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class CursoCreate(BaseModel):
    tema: str


class CursoResponse(BaseModel):
    id: int
    titulo: str
    descricao: Optional[str]
    roadmap: str
    duracao: Optional[str]
    
    class Config:
        from_attributes = True


class MaterialResponse(BaseModel):
    id: int
    curso_id: int
    titulo: str
    tipo: str
    conteudo: str
    
    class Config:
        from_attributes = True


class DuvidaCreate(BaseModel):
    curso_id: int
    pergunta: str


class DuvidaResponse(BaseModel):
    id: int
    usuario_id: int
    curso_id: int
    pergunta: str
    resposta: str
    
    class Config:
        from_attributes = True


# Rotas de Autenticação
@app.post("/api/cadastro", response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED)
async def cadastrar(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    """
    Cadastra novo usuário
    """
    try:
        user = auth.create_user(db, usuario.email, usuario.password, usuario.nome)
        return user
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao cadastrar usuário: {str(e)}"
        )


@app.post("/api/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    Autentica usuário e retorna token JWT
    """
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/api/me", response_model=UsuarioResponse)
async def get_me(current_user: Usuario = Depends(auth.get_current_user)):
    """
    Retorna informações do usuário atual
    """
    return current_user


# Rotas de Cursos
@app.get("/api/cursos", response_model=List[CursoResponse])
async def listar_cursos(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(auth.get_current_user)
):
    """
    Lista todos os cursos
    """
    cursos = curso_service.listar_cursos(db, skip, limit)
    return cursos


@app.post("/api/gerar-curso", response_model=CursoResponse, status_code=status.HTTP_201_CREATED)
async def gerar_curso(
    curso_data: CursoCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(auth.get_current_user)
):
    """
    Gera novo curso com IA
    """
    try:
        curso = curso_service.criar_curso(db, curso_data.tema)
        return curso
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao gerar curso: {str(e)}"
        )


@app.get("/api/cursos/{curso_id}", response_model=CursoResponse)
async def obter_curso(
    curso_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(auth.get_current_user)
):
    """
    Obtém curso por ID
    """
    curso = curso_service.obter_curso(db, curso_id)
    if not curso:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Curso não encontrado"
        )
    return curso


@app.delete("/api/cursos/{curso_id}", status_code=status.HTTP_204_NO_CONTENT)
async def deletar_curso(
    curso_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(auth.get_current_user)
):
    """
    Deleta curso por ID
    """
    if not curso_service.deletar_curso(db, curso_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Curso não encontrado"
        )


# Rotas de Materiais
@app.get("/api/cursos/{curso_id}/materiais", response_model=List[MaterialResponse])
async def listar_materiais(
    curso_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(auth.get_current_user)
):
    """
    Lista materiais de um curso
    """
    # Verifica se curso existe
    curso = curso_service.obter_curso(db, curso_id)
    if not curso:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Curso não encontrado"
        )
    
    materiais = material_service.listar_materiais(db, curso_id)
    return materiais


@app.get("/api/cursos/{curso_id}/materiais-externos")
async def obter_materiais_externos(
    curso_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(auth.get_current_user)
):
    """
    Retorna materiais externos relacionados ao curso
    """
    curso = curso_service.obter_curso(db, curso_id)
    if not curso:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Curso não encontrado"
        )
    
    materiais = material_service.buscar_materiais_externos(curso.titulo)
    return {"materiais": materiais}


@app.get("/api/cursos/{curso_id}/pdf")
async def download_pdf(
    curso_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(auth.get_current_user)
):
    """
    Gera e retorna PDF do roadmap do curso
    """
    curso = curso_service.obter_curso(db, curso_id)
    if not curso:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Curso não encontrado"
        )
    
    try:
        pdf_bytes = material_service.gerar_pdf(curso.roadmap, curso.titulo)
        
        # Define o tipo de conteúdo baseado no que foi gerado
        content_type = "application/pdf" if b'%PDF' in pdf_bytes[:10] else "text/html"
        extension = "pdf" if content_type == "application/pdf" else "html"
        
        return Response(
            content=pdf_bytes,
            media_type=content_type,
            headers={
                "Content-Disposition": f"attachment; filename={curso.titulo.replace(' ', '_')}.{extension}"
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao gerar PDF: {str(e)}"
        )


# Rotas de Dúvidas
@app.post("/api/responder-duvida", response_model=DuvidaResponse, status_code=status.HTTP_201_CREATED)
async def responder_duvida(
    duvida_data: DuvidaCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(auth.get_current_user)
):
    """
    Cria dúvida e gera resposta com IA
    """
    try:
        duvida = duvida_service.criar_duvida(
            db,
            current_user.id,
            duvida_data.curso_id,
            duvida_data.pergunta
        )
        return duvida
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao responder dúvida: {str(e)}"
        )


@app.get("/api/cursos/{curso_id}/duvidas", response_model=List[DuvidaResponse])
async def listar_duvidas_curso(
    curso_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(auth.get_current_user)
):
    """
    Lista dúvidas de um curso
    """
    duvidas = duvida_service.listar_duvidas_curso(db, curso_id, skip, limit)
    return duvidas


@app.get("/api/minhas-duvidas", response_model=List[DuvidaResponse])
async def listar_minhas_duvidas(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(auth.get_current_user)
):
    """
    Lista dúvidas do usuário atual
    """
    duvidas = duvida_service.listar_duvidas_usuario(db, current_user.id, skip, limit)
    return duvidas


# Rota de Health Check
@app.get("/")
async def root():
    """
    Health check da API
    """
    return {
        "status": "online",
        "message": "Tech Courses Platform API",
        "version": "1.0.0"
    }


@app.get("/api/health")
async def health():
    """
    Endpoint de saúde da API
    """
    return {"status": "healthy"}


# Inicialização do banco de dados
@app.on_event("startup")
async def startup_event():
    """
    Evento executado na inicialização da aplicação
    """
    init_db()
    print("✅ Banco de dados inicializado")
    print("🚀 API rodando em http://localhost:8000")
    print("📚 Documentação em http://localhost:8000/docs")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
