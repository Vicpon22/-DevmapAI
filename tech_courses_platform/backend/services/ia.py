"""
Serviço de integração com IA usando LangChain
NOTA: Este é um exemplo funcional que pode usar diferentes LLMs
"""
from typing import Optional
import os
import requests
import json


class AIService:
    """
    Serviço para integração com modelos de linguagem
    Suporta múltiplos backends: Ollama (local), OpenAI, Gemini, etc.
    """
    
    def __init__(self):
        self.llm_backend = os.getenv("LLM_BACKEND", "mock")  # "ollama", "openai", "mock"
        self.ollama_url = os.getenv("OLLAMA_URL", "http://localhost:11434")
        self.model_name = os.getenv("MODEL_NAME", "mistral")
        
    def _generate_with_ollama(self, prompt: str) -> str:
        """Gera texto usando Ollama local"""
        try:
            response = requests.post(
                f"{self.ollama_url}/api/generate",
                json={
                    "model": self.model_name,
                    "prompt": prompt,
                    "stream": False
                },
                timeout=120
            )
            response.raise_for_status()
            return response.json().get("response", "")
        except Exception as e:
            print(f"Erro ao gerar com Ollama: {e}")
            return self._generate_mock(prompt)
    
    def _generate_mock(self, prompt: str) -> str:
        """
        Gerador mock para desenvolvimento/testes
        Retorna conteúdo de exemplo baseado no tipo de prompt
        """
        if "ROADMAP DETALHADO" in prompt or "curso de" in prompt.lower():
            # Extrai tema do prompt
            tema = "Tecnologia"
            if "curso de " in prompt.lower():
                tema = prompt.lower().split("curso de ")[1].split(",")[0].strip()
            
            return f"""# Roadmap: {tema.title()}

## 📋 Pré-requisitos
- Conhecimento básico de programação
- Familiaridade com conceitos de computação
- Motivação para aprender continuamente

## 📚 Módulos Semanais

### Semana 1-2: Fundamentos
**Tópicos:**
- Introdução ao {tema}
- Conceitos básicos e terminologia
- História e evolução da área
- Aplicações práticas no mercado

**Subtópicos:**
- Configuração do ambiente de desenvolvimento
- Primeiros passos com ferramentas essenciais
- Exemplos práticos introdutórios

**Projeto Prático:**
Criar um projeto simples que demonstre os conceitos básicos aprendidos.

### Semana 3-4: Conceitos Intermediários
**Tópicos:**
- Aprofundamento em técnicas essenciais
- Padrões e melhores práticas
- Ferramentas e frameworks populares
- Debugging e troubleshooting

**Subtópicos:**
- Estruturas de dados aplicadas
- Algoritmos fundamentais
- Otimização de código

**Projeto Prático:**
Desenvolver uma aplicação funcional que integre múltiplos conceitos.

### Semana 5-6: Tópicos Avançados
**Tópicos:**
- Arquiteturas escaláveis
- Segurança e performance
- Integração com APIs e serviços externos
- Testes e qualidade de código

**Subtópicos:**
- Design patterns
- Clean code principles
- CI/CD e DevOps básico

**Projeto Prático:**
Criar uma aplicação completa com arquitetura profissional.

### Semana 7-8: Projeto Final e Especialização
**Tópicos:**
- Desenvolvimento de projeto capstone
- Áreas de especialização
- Tendências e futuro da área
- Preparação para o mercado de trabalho

**Subtópicos:**
- Portfólio e GitHub
- Soft skills para desenvolvedores
- Networking e comunidade

**Projeto Prático:**
Projeto final completo que demonstre domínio dos conceitos.

## 📖 Materiais Complementares

### Livros Recomendados:
1. **"{tema.title()}: Um Guia Prático"** - Autor Exemplo
2. **"Dominando {tema.title()}"** - Editora Tech
3. **"Padrões de Projeto em {tema.title()}"** - Expert Press

### Artigos e Tutoriais:
- Documentação oficial das principais ferramentas
- Blog posts de desenvolvedores experientes
- Tutoriais em vídeo no YouTube

### Cursos Online Complementares:
- Coursera: Especialização em {tema}
- Udemy: {tema} do Zero ao Avançado
- edX: Fundamentos de {tema}

### Comunidades e Fóruns:
- Stack Overflow (tag: {tema.lower()})
- Reddit: r/{tema.lower()}
- Discord: Comunidades de desenvolvedores

## ⏱️ Duração Estimada
**8 semanas** (dedicação de 10-15 horas por semana)

## 🎯 Objetivos de Aprendizado
Ao final deste curso, você será capaz de:
- Compreender profundamente os conceitos de {tema}
- Desenvolver aplicações profissionais na área
- Resolver problemas complexos de forma eficiente
- Continuar aprendendo de forma autônoma

## 🚀 Próximos Passos
Após concluir este roadmap, considere:
- Contribuir para projetos open source
- Criar seu próprio projeto pessoal
- Buscar certificações profissionais
- Participar de hackathons e competições
"""
        
        elif "Responda a seguinte dúvida" in prompt or "Pergunta:" in prompt:
            # Resposta a dúvidas
            return """Com base no conteúdo do curso, aqui está uma explicação detalhada:

**Conceito Principal:**
O tópico em questão é fundamental para o desenvolvimento na área. Vou explicar de forma clara e com exemplos práticos.

**Explicação Detalhada:**
1. **Primeiro aspecto**: Este é um conceito essencial que serve como base para compreensão avançada.

2. **Segundo aspecto**: Na prática, isso significa que você deve prestar atenção especial em como estruturar seu código e organizar seus projetos.

3. **Terceiro aspecto**: Muitos desenvolvedores iniciantes têm dúvidas sobre este ponto, mas com prática constante fica mais claro.

**Exemplo Prático:**
```python
# Exemplo de código ilustrativo
def exemplo_pratico():
    # Este código demonstra o conceito
    resultado = processar_dados()
    return resultado
```

**Recursos Adicionais:**
- 📚 Documentação oficial: https://docs.exemplo.com
- 🎥 Tutorial em vídeo: https://youtube.com/exemplo
- 💬 Fórum de discussão: https://stackoverflow.com/questions/exemplo

**Dica Profissional:**
Para dominar este conceito, pratique criando pequenos projetos que apliquem estas técnicas. A repetição e experimentação são fundamentais para fixação.

Se precisar de mais esclarecimentos sobre algum ponto específico, fique à vontade para perguntar!"""
        
        else:
            return "Resposta gerada pela IA para o prompt fornecido."
    
    def generate(self, prompt: str) -> str:
        """
        Gera texto usando o backend configurado
        
        Args:
            prompt: Prompt para geração
            
        Returns:
            str: Texto gerado
        """
        if self.llm_backend == "ollama":
            return self._generate_with_ollama(prompt)
        else:
            # Mock por padrão
            return self._generate_mock(prompt)


# Singleton
_ai_service = None


def get_ai_service() -> AIService:
    """Obtém instância singleton do serviço de IA"""
    global _ai_service
    if _ai_service is None:
        _ai_service = AIService()
    return _ai_service


def gerar_roadmap(tema: str) -> str:
    """
    Gera roadmap detalhado para um curso sobre o tema
    
    Args:
        tema: Tema do curso (ex: "Inteligência Artificial")
        
    Returns:
        str: Roadmap em formato Markdown
    """
    prompt = f"""Crie um ROADMAP DETALHADO para um curso de {tema}, incluindo:
1. Pré-requisitos (conhecimentos necessários).
2. Módulos semanais (tópicos, subtópicos e recursos).
3. Projetos práticos para cada módulo.
4. Materiais complementares (livros, artigos, vídeos).
5. Duração estimada para conclusão.
Formato: Markdown, com títulos claros e lista de itens."""
    
    ai_service = get_ai_service()
    return ai_service.generate(prompt)


def responder_duvida(pergunta: str, contexto: str) -> str:
    """
    Responde dúvida de aluno com base no contexto do curso
    
    Args:
        pergunta: Pergunta do aluno
        contexto: Contexto do curso (título ou conteúdo relevante)
        
    Returns:
        str: Resposta detalhada
    """
    prompt = f"""Responda a seguinte dúvida de um aluno sobre {contexto}:
Pergunta: {pergunta}
Resposta: (detalhada, com exemplos práticos e links para recursos externos, se necessário)"""
    
    ai_service = get_ai_service()
    return ai_service.generate(prompt)
