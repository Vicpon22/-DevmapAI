'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Clock, TrendingUp, Search, Plus } from 'lucide-react';
import Link from 'next/link';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Cursos de exemplo (em produção, viria de um banco de dados)
  const courses = [
    {
      id: 'react-course',
      title: 'Curso Completo de React.js',
      description: 'Aprenda React.js do zero ao avançado com conteúdo prático e teórico.',
      category: 'Desenvolvimento Web',
      level: 'intermediate',
      progress: 65,
      modules: 6,
      hours: 48,
    },
    {
      id: 'python-course',
      title: 'Curso Completo de Python',
      description: 'Domine Python com exemplos práticos e projetos reais.',
      category: 'Engenharia de Software',
      level: 'beginner',
      progress: 30,
      modules: 8,
      hours: 64,
    },
    {
      id: 'networks-course',
      title: 'Curso Completo de Redes de Computadores',
      description: 'Aprenda redes de computadores com abordagem universitária.',
      category: 'Redes de Computadores',
      level: 'advanced',
      progress: 0,
      modules: 10,
      hours: 80,
    },
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-600';
      case 'intermediate': return 'bg-yellow-600';
      case 'advanced': return 'bg-red-600';
      default: return 'bg-slate-600';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return 'Iniciante';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return level;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">Meus Cursos</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              <Plus className="w-5 h-5" />
              Criar Novo Curso
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total de Cursos</p>
                <p className="text-3xl font-bold text-white">{courses.length}</p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-400" />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Horas de Estudo</p>
                <p className="text-3xl font-bold text-white">
                  {courses.reduce((acc, course) => acc + course.hours, 0)}h
                </p>
              </div>
              <Clock className="w-12 h-12 text-purple-400" />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Progresso Médio</p>
                <p className="text-3xl font-bold text-white">
                  {Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length)}%
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-400" />
            </div>
          </div>
        </div>

        {/* Busca */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar cursos..."
              className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Lista de Cursos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden hover:border-blue-500 transition-all hover:shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-2">{course.description}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Categoria:</span>
                    <span className="text-slate-300">{course.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Nível:</span>
                    <span className={`px-2 py-1 rounded text-white text-xs ${getLevelColor(course.level)}`}>
                      {getLevelLabel(course.level)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Módulos:</span>
                    <span className="text-slate-300">{course.modules}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Duração:</span>
                    <span className="text-slate-300">{course.hours}h</span>
                  </div>
                </div>

                {/* Progresso */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-400">Progresso</span>
                    <span className="text-slate-300 font-semibold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <Link
                  href={`/course-generator?topic=${encodeURIComponent(course.title.replace('Curso Completo de ', ''))}&level=${course.level}`}
                  className="block w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-center font-semibold transition"
                >
                  Continuar Estudando
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Nenhum curso encontrado</h3>
            <p className="text-slate-400">Tente buscar com outros termos</p>
          </div>
        )}
      </main>
    </div>
  );
}
