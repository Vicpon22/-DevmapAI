"""
Script de configuração do banco de dados
Cria todas as tabelas e dados iniciais se necessário
"""
import sys
import os

# Adiciona o diretório backend ao path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from database import engine, SessionLocal
from models import Base, Usuario, Curso, Material, Duvida
from services.auth import hash_password


def create_tables():
    """Cria todas as tabelas no banco de dados"""
    print("🔧 Criando tabelas no banco de dados...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tabelas criadas com sucesso!")


def create_sample_data():
    """Cria dados de exemplo para testes"""
    db = SessionLocal()
    
    try:
        # Verifica se já existem dados
        if db.query(Usuario).first():
            print("ℹ️  Banco de dados já contém dados. Pulando criação de dados de exemplo.")
            return
        
        print("📝 Criando dados de exemplo...")
        
        # Cria usuário de teste
        usuario_teste = Usuario(
            email="teste@exemplo.com",
            senha=hash_password("senha123"),
            nome="Usuário Teste"
        )
        db.add(usuario_teste)
        db.commit()
        print("✅ Usuário de teste criado: teste@exemplo.com / senha123")
        
        # Cria curso de exemplo
        curso_exemplo = Curso(
            titulo="Introdução à Inteligência Artificial",
            descricao="Curso completo de IA para iniciantes",
            roadmap="""# Roadmap: Introdução à Inteligência Artificial

## 📋 Pré-requisitos
- Conhecimento básico de programação (Python)
- Fundamentos de matemática (álgebra linear, cálculo)
- Estatística básica

## 📚 Módulos Semanais

### Semana 1-2: Fundamentos de IA
- História e evolução da IA
- Tipos de aprendizado: supervisionado, não-supervisionado, por reforço
- Conceitos fundamentais de Machine Learning
- Configuração do ambiente Python

### Semana 3-4: Machine Learning Clássico
- Regressão Linear e Logística
- Árvores de Decisão
- Random Forest
- SVM (Support Vector Machines)

### Semana 5-6: Deep Learning
- Redes Neurais Artificiais
- TensorFlow e PyTorch
- CNNs para visão computacional
- RNNs para processamento de texto

### Semana 7-8: Projeto Final
- Desenvolvimento de projeto capstone
- Deploy de modelos
- Boas práticas em produção

## ⏱️ Duração Estimada
8 semanas (10-15 horas por semana)
""",
            duracao="8 semanas"
        )
        db.add(curso_exemplo)
        db.commit()
        db.refresh(curso_exemplo)
        print(f"✅ Curso de exemplo criado: {curso_exemplo.titulo}")
        
        # Cria materiais de exemplo
        materiais_exemplo = [
            Material(
                curso_id=curso_exemplo.id,
                titulo="Documentação TensorFlow",
                tipo="Link",
                conteudo="https://www.tensorflow.org/learn"
            ),
            Material(
                curso_id=curso_exemplo.id,
                titulo="Livro: Hands-On Machine Learning",
                tipo="Livro",
                conteudo="Guia prático completo de Machine Learning com Scikit-Learn e TensorFlow"
            ),
            Material(
                curso_id=curso_exemplo.id,
                titulo="Curso Stanford CS229",
                tipo="Vídeo",
                conteudo="https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU"
            )
        ]
        
        for material in materiais_exemplo:
            db.add(material)
        db.commit()
        print(f"✅ {len(materiais_exemplo)} materiais de exemplo criados")
        
        # Cria dúvida de exemplo
        duvida_exemplo = Duvida(
            usuario_id=usuario_teste.id,
            curso_id=curso_exemplo.id,
            pergunta="Qual a diferença entre Machine Learning e Deep Learning?",
            resposta="""**Machine Learning (ML)** é um campo da Inteligência Artificial que permite que computadores aprendam padrões a partir de dados sem serem explicitamente programados. Exemplos incluem regressão linear, árvores de decisão e SVM.

**Deep Learning (DL)** é um subcampo do Machine Learning que usa redes neurais artificiais com múltiplas camadas (daí "deep" - profundo). É especialmente eficaz para:
- Processamento de imagens (CNNs)
- Processamento de linguagem natural (Transformers)
- Reconhecimento de voz

**Principais diferenças:**
1. **Complexidade**: DL usa redes com muitas camadas, ML clássico usa algoritmos mais simples
2. **Dados**: DL precisa de grandes volumes de dados, ML pode funcionar com menos
3. **Hardware**: DL geralmente requer GPUs, ML pode rodar em CPUs
4. **Feature Engineering**: ML requer engenharia manual de features, DL aprende automaticamente

**Em resumo**: Todo Deep Learning é Machine Learning, mas nem todo Machine Learning é Deep Learning!"""
        )
        db.add(duvida_exemplo)
        db.commit()
        print("✅ Dúvida de exemplo criada")
        
        print("\n🎉 Dados de exemplo criados com sucesso!")
        print("\n📋 Credenciais de teste:")
        print("   E-mail: teste@exemplo.com")
        print("   Senha: senha123")
        
    except Exception as e:
        print(f"❌ Erro ao criar dados de exemplo: {e}")
        db.rollback()
    finally:
        db.close()


def main():
    """Função principal do script"""
    print("=" * 60)
    print("🚀 SETUP DO BANCO DE DADOS - Tech Courses Platform")
    print("=" * 60)
    print()
    
    # Cria tabelas
    create_tables()
    print()
    
    # Pergunta se deve criar dados de exemplo
    resposta = input("Deseja criar dados de exemplo? (s/n): ").lower()
    if resposta in ['s', 'sim', 'y', 'yes']:
        create_sample_data()
    
    print()
    print("=" * 60)
    print("✅ Setup concluído com sucesso!")
    print("=" * 60)


if __name__ == "__main__":
    main()
