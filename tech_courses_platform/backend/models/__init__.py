"""
Módulo de modelos do banco de dados
"""
from .base import Base
from .usuario import Usuario
from .curso import Curso
from .material import Material
from .duvida import Duvida

__all__ = ['Base', 'Usuario', 'Curso', 'Material', 'Duvida']
