'use client';

import { useState } from 'react';
import { BookOpen, Brain, Code, FileText, GraduationCap, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('intermediate');

  const features = [
    {
      icon: <Brain className="w-12 h-12 text-blue-400" />,
      title: 'Geração de Cursos com IA',
      description: 'Crie cursos completos de tecnologia com conteúdo acadêmico de alta qualidade, exemplos práticos e materiais didáticos abrangentes.',
    },
    {
      icon: <FileText className="w-12 h-12 text-purple-400" />,
      title: 'Livros e Materiais PDF',
      description: 'Exporte conteúdo organizado por módulos em formato PDF com fluxogramas, mapas mentais e exemplos de código.',
    },
    {
      icon: <Sparkles className="w-12 h-12 text-yellow-400" />,
      title: 'Assistente IA Integrado',
      description: 'Tire suas dúvidas em tempo real com um assistente de IA especializado no conteúdo do curso.',
    },
    {
      icon: <Code className="w-12 h-12 text-green-400" />,
      title: 'Laboratório Virtual',
      description: 'Pratique programação em um ambiente interativo com editor de código e testes automatizados.',
    },
  ];

  const categories = [
    'Desenvolvimento Web',
    'Engenharia de Software',
    'Ciência de Dados',
    'Redes de Computadores',
    'Desenvolvimento Mobile',
    'Backend & APIs',
    'DevOps',
    'Segurança da Informação',
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">AI Learning Platform</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-slate-300 hover:text-white transition">Home</Link>
              <Link href="/courses" className="text-slate-300 hover:text-white transition">Meus Cursos</Link>
              <Link href="/lab" className="text-slate-300 hover:text-white transition">Laboratório</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
              Aprenda Tecnologia com IA
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8">
              Sistema inteligente que cria cursos personalizados com conteúdo universitário,
              <br />exemplos práticos, fluxogramas e laboratório virtual
            </p>
          </div>

          {/* Course Generator */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700 animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-400" />
              Gerar Novo Curso com IA
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2 font-medium">
                  Qual curso você deseja criar?
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ex: React.js, Python, Redes de Computadores, Machine Learning..."
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2 font-medium">
                  Nível do curso
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="beginner">Iniciante</option>
                  <option value="intermediate">Intermediário</option>
                  <option value="advanced">Avançado</option>
                </select>
              </div>

              <Link 
                href={`/course-generator?topic=${encodeURIComponent(topic)}&level=${level}`}
                className={`block w-full py-4 rounded-lg font-semibold text-center transition ${
                  topic.trim()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                🚀 Gerar Curso com IA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Recursos da Plataforma
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all hover:shadow-xl"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Áreas de Conhecimento
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all text-center hover:scale-105 cursor-pointer"
              >
                <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <span className="text-slate-300 font-medium">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>© 2026 AI Learning Platform - Plataforma de Educação com IA</p>
          <p className="mt-2 text-sm">Desenvolvido com Next.js, TypeScript e Inteligência Artificial</p>
        </div>
      </footer>
    </div>
  );
}
