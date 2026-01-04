"""
Serviço de autenticação com JWT
"""
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from models.usuario import Usuario
from database import get_db
import os

# Configurações
SECRET_KEY = os.getenv("SECRET_KEY", "sua-chave-secreta-muito-segura-aqui-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 dias

# Contexto de criptografia de senha
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")


def hash_password(password: str) -> str:
    """
    Gera hash da senha usando bcrypt
    
    Args:
        password: Senha em texto plano
        
    Returns:
        str: Hash da senha
    """
    # Bcrypt tem limite de 72 bytes - trunca se necessário
    if len(password) > 72:
        password = password[:72]
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica se a senha corresponde ao hash
    
    Args:
        plain_password: Senha em texto plano
        hashed_password: Hash da senha
        
    Returns:
        bool: True se corresponder, False caso contrário
    """
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Cria token JWT
    
    Args:
        data: Dados a serem codificados no token
        expires_delta: Tempo de expiração personalizado
        
    Returns:
        str: Token JWT
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def authenticate_user(db: Session, email: str, password: str) -> Optional[Usuario]:
    """
    Autentica usuário verificando e-mail e senha
    
    Args:
        db: Sessão do banco de dados
        email: E-mail do usuário
        password: Senha em texto plano
        
    Returns:
        Usuario | None: Usuário autenticado ou None
    """
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.senha):
        return None
    return user


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> Usuario:
    """
    Obtém usuário atual a partir do token JWT
    
    Args:
        token: Token JWT
        db: Sessão do banco de dados
        
    Returns:
        Usuario: Usuário autenticado
        
    Raises:
        HTTPException: Se o token for inválido
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciais inválidas",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if user is None:
        raise credentials_exception
    
    return user


def create_user(db: Session, email: str, password: str, nome: str) -> Usuario:
    """
    Cria novo usuário no banco de dados
    
    Args:
        db: Sessão do banco de dados
        email: E-mail do usuário
        password: Senha em texto plano
        nome: Nome do usuário
        
    Returns:
        Usuario: Usuário criado
        
    Raises:
        HTTPException: Se o e-mail já estiver em uso
    """
    # Verifica se e-mail já existe
    existing_user = db.query(Usuario).filter(Usuario.email == email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="E-mail já cadastrado"
        )
    
    # Cria novo usuário
    hashed_password = hash_password(password)
    user = Usuario(email=email, senha=hashed_password, nome=nome)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
