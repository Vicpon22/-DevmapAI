# 🎓 Tech Courses Platform

Plataforma completa de cursos de tecnologia com IA integrada, semelhante ao Roadmap.sh.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Execução](#instalação-e-execução)
- [Uso da API](#uso-da-api)
- [Frontend](#frontend)
- [Integração com IA](#integração-com-ia)
- [Deploy](#deploy)

## 🎯 Visão Geral

Sistema completo para geração e gerenciamento de cursos de tecnologia, com as seguintes capacidades:

- **Geração Automática de Roadmaps**: IA cria roadmaps detalhados para qualquer tema de tecnologia
- **Sistema de Autenticação**: Login/cadastro com JWT
- **Materiais Complementares**: PDFs, links, livros e vídeos
- **Chat com IA**: Responde dúvidas dos alunos sobre os cursos
- **Download de Conteúdo**: Exportação de roadmaps em PDF

## ✨ Funcionalidades

### Backend (FastAPI + SQLAlchemy)

1. **Autenticação**
   - Cadastro de usuários
   - Login com JWT
   - Proteção de rotas

2. **Gerenciamento de Cursos**
   - Criação automática com IA
   - Listagem de cursos
   - Detalhes do curso
   - Exclusão de cursos

3. **Materiais**
   - Geração automática de materiais complementares
   - Busca de recursos externos
   - Download de PDFs

4. **Sistema de Dúvidas**
   - Envio de perguntas
   - Respostas automáticas com IA
   - Histórico de dúvidas

### Frontend (React)

1. **Páginas**
   - Login/Cadastro
   - Dashboard (lista de cursos)
   - Visualização de curso
   - Chat com IA

2. **Recursos**
   - Interface responsiva
   - Design moderno
   - Navegação intuitiva

## 🛠️ Tecnologias

### Backend
- **FastAPI**: Framework web moderno e rápido
- **SQLAlchemy**: ORM para banco de dados
- **SQLite**: Banco de dados (desenvolvimento)
- **JWT**: Autenticação segura
- **Bcrypt**: Hash de senhas
- **ReportLab**: Geração de PDFs
- **Python 3.9+**: Linguagem base

### Frontend
- **React 18**: Biblioteca UI
- **React Router**: Navegação
- **Axios**: Cliente HTTP
- **React Markdown**: Renderização de Markdown

### IA (Opcional)
- **LangChain**: Framework para LLMs
- **Ollama**: Runtime local para LLMs
- **Mistral/Llama**: Modelos de linguagem

## 📁 Estrutura do Projeto

```
tech_courses_platform/
├── backend/
│   ├── models/           # Modelos SQLAlchemy
│   │   ├── usuario.py
│   │   ├── curso.py
│   │   ├── material.py
│   │   └── duvida.py
│   ├── services/         # Lógica de negócios
│   │   ├── auth.py
│   │   ├── ia.py
│   │   ├── curso.py
│   │   ├── material.py
│   │   └── duvida.py
│   ├── main.py           # API principal
│   ├── database.py       # Configuração do banco
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── pages/        # Páginas
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── scripts/
│   └── setup_db.py       # Setup do banco de dados
├── docs/
│   └── README.md
└── .env                  # Variáveis de ambiente
```

## 🚀 Instalação e Execução

### Pré-requisitos

- Python 3.9 ou superior
- Node.js 16 ou superior
- npm ou yarn

### 1. Backend

```bash
# Entre no diretório do backend
cd backend

# Crie ambiente virtual
python -m venv venv

# Ative o ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instale dependências
pip install -r requirements.txt

# Configure variáveis de ambiente
cp ../.env.example ../.env
# Edite o arquivo .env conforme necessário

# Inicialize o banco de dados
python ../scripts/setup_db.py

# Execute o servidor
python main.py
```

O backend estará disponível em: `http://localhost:8000`

Documentação da API: `http://localhost:8000/docs`

### 2. Frontend

```bash
# Entre no diretório do frontend
cd frontend

# Instale dependências
npm install

# Execute o servidor de desenvolvimento
npm start
```

O frontend estará disponível em: `http://localhost:3000`

### Credenciais de Teste

Se você criou os dados de exemplo durante o setup:

- **E-mail**: teste@exemplo.com
- **Senha**: senha123

## 📚 Uso da API

### Autenticação

#### Cadastro
```bash
curl -X POST "http://localhost:8000/api/cadastro" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com",
    "password": "senha123",
    "nome": "Nome do Usuário"
  }'
```

#### Login
```bash
curl -X POST "http://localhost:8000/api/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=usuario@exemplo.com&password=senha123"
```

### Cursos

#### Criar Curso
```bash
curl -X POST "http://localhost:8000/api/gerar-curso" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tema": "Inteligência Artificial"}'
```

#### Listar Cursos
```bash
curl "http://localhost:8000/api/cursos" \
  -H "Authorization: Bearer SEU_TOKEN"
```

#### Obter Curso
```bash
curl "http://localhost:8000/api/cursos/1" \
  -H "Authorization: Bearer SEU_TOKEN"
```

#### Download PDF
```bash
curl "http://localhost:8000/api/cursos/1/pdf" \
  -H "Authorization: Bearer SEU_TOKEN" \
  --output curso.pdf
```

### Dúvidas

#### Criar Dúvida
```bash
curl -X POST "http://localhost:8000/api/responder-duvida" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "curso_id": 1,
    "pergunta": "O que é Machine Learning?"
  }'
```

## 🎨 Frontend

### Estrutura de Componentes

1. **Login.jsx**: Página de login/cadastro
2. **Dashboard.jsx**: Lista de cursos disponíveis
3. **Curso.jsx**: Visualização detalhada do curso
4. **ChatAI.jsx**: Interface de chat com IA

### Navegação

- `/` - Login/Cadastro
- `/dashboard` - Dashboard (protegido)
- `/curso/:id` - Visualização do curso (protegido)

## 🤖 Integração com IA

### Modo Mock (Padrão)

Por padrão, o sistema usa um gerador mock que cria conteúdo de exemplo. Ideal para desenvolvimento e testes.

### Modo Ollama (LLM Local)

Para usar modelos de linguagem reais localmente:

1. **Instale o Ollama**
   ```bash
   # https://ollama.ai/
   curl https://ollama.ai/install.sh | sh
   ```

2. **Baixe um modelo**
   ```bash
   ollama pull mistral
   # ou
   ollama pull llama2
   ```

3. **Configure o .env**
   ```env
   LLM_BACKEND=ollama
   OLLAMA_URL=http://localhost:11434
   MODEL_NAME=mistral
   ```

4. **Reinicie o backend**

### Modo OpenAI (API)

Para usar a API da OpenAI:

1. **Configure o .env**
   ```env
   LLM_BACKEND=openai
   OPENAI_API_KEY=sk-...
   ```

2. **Implemente o método no `services/ia.py`**

## 🐳 Deploy

### Docker (Backend)

```dockerfile
# backend/Dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
# Build
docker build -t tech-courses-backend ./backend

# Run
docker run -p 8000:8000 tech-courses-backend
```

### Docker (Frontend)

```dockerfile
# frontend/Dockerfile
FROM node:16

WORKDIR /app
COPY package.json .
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/tech_courses
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=tech_courses
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 🧪 Testes

### Backend

```bash
cd backend
pytest
```

### Frontend

```bash
cd frontend
npm test
```

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📧 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para a comunidade tech**
