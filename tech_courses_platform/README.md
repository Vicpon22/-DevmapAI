# 🎓 Tech Courses Platform

> Plataforma completa de cursos de tecnologia com IA integrada, semelhante ao Roadmap.sh

[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)

## 🚀 Quick Start

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python ../scripts/setup_db.py
python main.py
```

Acesse: http://localhost:8000

### Frontend

```bash
cd frontend
npm install
npm start
```

Acesse: http://localhost:3000

### Credenciais de Teste

- **E-mail**: teste@exemplo.com
- **Senha**: senha123

## ✨ Funcionalidades

- ✅ **Autenticação JWT** - Login/cadastro seguro
- ✅ **Geração de Cursos com IA** - Roadmaps detalhados automaticamente
- ✅ **Materiais Complementares** - PDFs, links, livros e vídeos
- ✅ **Chat com IA** - Responde dúvidas dos alunos
- ✅ **Download de PDFs** - Exportação de roadmaps
- ✅ **Interface Responsiva** - Design moderno e intuitivo

## 📚 Documentação Completa

Veja a [documentação detalhada](./docs/README.md) para:
- Instalação completa
- Uso da API
- Integração com IA
- Deploy e Docker

## 🛠️ Tecnologias

**Backend:** FastAPI • SQLAlchemy • JWT • Bcrypt • ReportLab

**Frontend:** React • React Router • Axios • React Markdown

**IA:** LangChain • Ollama • Mistral/Llama (opcional)

## 📁 Estrutura

```
tech_courses_platform/
├── backend/           # API FastAPI
├── frontend/          # Interface React
├── scripts/           # Scripts auxiliares
├── docker/            # Dockerfiles
└── docs/              # Documentação
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Abra uma issue ou envie um PR.

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido com ❤️ usando IA**
