# 🎓 AI Learning Platform

## Plataforma de Educação com Inteligência Artificial

Uma plataforma completa de ensino que utiliza IA para gerar cursos personalizados de tecnologia e engenharia, com conteúdo de nível universitário, exemplos práticos, fluxogramas, mapas mentais e laboratório virtual de programação.

---

## 🚀 Funcionalidades Principais

### 1. **Geração Automática de Cursos com IA**
- ✅ Cria cursos completos sobre qualquer tema de tecnologia
- ✅ Conteúdo didático de qualidade universitária (nível Unigranrio)
- ✅ Exemplos reais e práticos de fácil entendimento
- ✅ Conteúdo abrangente e estruturado em módulos
- ✅ Suporte para múltiplas áreas: Web, Backend, Redes, Ciência de Dados, Mobile, etc.

### 2. **Sistema de Livros e Exportação PDF**
- ✅ Geração automática de livros com conteúdo dos cursos
- ✅ Conteúdo separado por módulos organizados
- ✅ Inclui textos, exemplos de código, fluxogramas e mapas mentais
- ✅ Exportação em formato PDF para estudo offline
- ✅ Formatação profissional e legível

### 3. **Assistente IA Integrado**
- ✅ Chat inteligente para tirar dúvidas sobre o curso
- ✅ Respostas contextualizadas baseadas no conteúdo estudado
- ✅ Explicações detalhadas com exemplos práticos
- ✅ Disponível em todas as lições do curso

### 4. **Laboratório Virtual de Programação**
- ✅ Editor de código interativo
- ✅ Desafios de programação em múltiplas linguagens
- ✅ Sistema de testes automatizados
- ✅ Feedback instantâneo sobre as soluções
- ✅ Níveis de dificuldade progressivos

### 5. **Recursos Educacionais Avançados**
- ✅ **Exemplos de Código**: Em Python, JavaScript, Java, TypeScript
- ✅ **Fluxogramas**: Diagramas visuais usando Mermaid
- ✅ **Mapas Mentais**: Organização visual de conceitos
- ✅ **Casos de Uso Reais**: Aplicações práticas em empresas reais
- ✅ **Boas Práticas**: Padrões de projeto e clean code

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript
- **Estilização**: Tailwind CSS, Framer Motion
- **Ícones**: Lucide React
- **Editor de Código**: Monaco Editor (VS Code)
- **Diagramas**: Mermaid.js
- **Exportação**: jsPDF, html2canvas
- **State Management**: Zustand
- **Highlight de Código**: React Syntax Highlighter

---

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositório>
cd webapp
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Acesse a aplicação**
```
http://localhost:3000
```

---

## 🎯 Como Usar

### Criar um Novo Curso

1. Na página inicial, digite o tema do curso desejado
   - Exemplos: "React.js", "Python", "Redes de Computadores", "Machine Learning"

2. Selecione o nível:
   - Iniciante
   - Intermediário
   - Avançado

3. Clique em **"Gerar Curso com IA"**

4. Aguarde enquanto a IA cria:
   - Estrutura de módulos
   - Lições com conteúdo didático
   - Exemplos de código
   - Fluxogramas e mapas mentais

### Estudar um Curso

1. Navegue pelos módulos na barra lateral
2. Leia o conteúdo das lições
3. Estude os exemplos de código em múltiplas linguagens
4. Analise os fluxogramas e mapas mentais
5. Use o **Assistente IA** para tirar dúvidas
6. Exporte o conteúdo em **PDF** para estudo offline

### Praticar no Laboratório

1. Acesse o menu **"Laboratório"**
2. Escolha um desafio de programação
3. Escreva seu código no editor
4. Clique em **"Executar Código"**
5. Veja os resultados dos testes automatizados

---

## 📚 Estrutura do Projeto

```
webapp/
├── app/                          # Páginas Next.js
│   ├── page.tsx                  # Página inicial
│   ├── layout.tsx                # Layout principal
│   ├── globals.css               # Estilos globais
│   ├── course-generator/         # Gerador de cursos
│   │   └── page.tsx
│   ├── courses/                  # Lista de cursos
│   │   └── page.tsx
│   └── lab/                      # Laboratório virtual
│       └── page.tsx
├── components/                   # Componentes reutilizáveis
├── lib/                          # Bibliotecas e serviços
│   ├── ai-service.ts             # Serviço de IA
│   └── pdf-service.ts            # Serviço de PDF
├── types/                        # Tipos TypeScript
│   └── index.ts
├── public/                       # Arquivos estáticos
├── package.json                  # Dependências
├── tsconfig.json                 # Configuração TypeScript
├── tailwind.config.ts            # Configuração Tailwind
└── next.config.js                # Configuração Next.js
```

---

## 🎨 Recursos Visuais

### Interface Moderna
- Design inspirado no roadmap.sh
- Tema escuro profissional
- Animações suaves
- Totalmente responsivo

### Componentes Interativos
- Editor de código com syntax highlighting
- Chat com IA em tempo real
- Navegação intuitiva entre lições
- Barra de progresso visual

---

## 🔮 Integrações Futuras

### IA Avançada
- [ ] Integração com OpenAI GPT-4
- [ ] Integração com Google Gemini
- [ ] Geração de conteúdo ainda mais personalizado

### Recursos Adicionais
- [ ] Sistema de autenticação de usuários
- [ ] Salvamento de progresso em banco de dados
- [ ] Fórum de discussão entre alunos
- [ ] Certificados de conclusão
- [ ] Gamificação com pontos e badges

### Melhorias no Laboratório
- [ ] Execução real de código (sandbox seguro)
- [ ] Mais linguagens de programação
- [ ] Desafios colaborativos
- [ ] Ranking de estudantes

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

---

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ usando Next.js, TypeScript e Inteligência Artificial

---

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no GitHub.

---

## 🌟 Destaques

- ✅ **100% Gratuito** - Todos os recursos disponíveis sem custo
- ✅ **Conteúdo de Qualidade** - Nível universitário
- ✅ **Prático e Teórico** - Equilíbrio perfeito
- ✅ **Interface Moderna** - Design profissional
- ✅ **Código Aberto** - Totalmente customizável

---

**Comece a aprender hoje mesmo! 🚀**
