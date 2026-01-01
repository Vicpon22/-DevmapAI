'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AIService } from '@/lib/ai-service';
import { PDFService } from '@/lib/pdf-service';
import { Course } from '@/types';
import { BookOpen, Download, MessageSquare, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

function CourseGeneratorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedModule, setSelectedModule] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);

  const topic = searchParams.get('topic');
  const level = searchParams.get('level');

  useEffect(() => {
    if (topic && level && !course) {
      generateCourse();
    }
  }, [topic, level]);

  const generateCourse = async () => {
    if (!topic || !level) return;
    
    setLoading(true);
    try {
      const generatedCourse = await AIService.generateCourse(topic, level);
      setCourse(generatedCourse);
    } catch (error) {
      console.error('Erro ao gerar curso:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (!course) return;
    const result = await PDFService.generateBookPDF(course);
    alert(result);
  };

  const handleAskQuestion = async () => {
    if (!question.trim() || !course) return;
    
    const userMessage = { role: 'user', content: question };
    setChatHistory([...chatHistory, userMessage]);
    
    const answer = await AIService.answerQuestion(question, course.title);
    const aiMessage = { role: 'assistant', content: answer };
    
    setChatHistory([...chatHistory, userMessage, aiMessage]);
    setQuestion('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-400 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Gerando seu curso com IA...</h2>
          <p className="text-slate-400">Criando conteúdo didático, exemplos e materiais...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Nenhum curso selecionado</h2>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Voltar para a home
          </Link>
        </div>
      </div>
    );
  }

  const currentModule = course.modules[selectedModule];
  const currentLesson = currentModule?.lessons[selectedLesson];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition">
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </Link>
            <h1 className="text-xl font-bold text-white truncate max-w-md">{course.title}</h1>
            <div className="flex gap-2">
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
              >
                <Download className="w-4 h-4" />
                <span className="hidden md:inline">Exportar PDF</span>
              </button>
              <button
                onClick={() => setChatOpen(!chatOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden md:inline">Assistente IA</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Módulos */}
        <aside className="w-80 border-r border-slate-700 bg-slate-900/50 h-[calc(100vh-73px)] overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-bold text-white mb-4">Módulos do Curso</h2>
            {course.modules.map((module, moduleIndex) => (
              <div key={module.id} className="mb-4">
                <button
                  onClick={() => {
                    setSelectedModule(moduleIndex);
                    setSelectedLesson(0);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedModule === moduleIndex
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <div className="font-semibold">{module.title}</div>
                  <div className="text-sm opacity-75">{module.lessons.length} lições</div>
                </button>
                
                {selectedModule === moduleIndex && (
                  <div className="mt-2 ml-2 space-y-1">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lessonIndex)}
                        className={`w-full text-left p-2 rounded text-sm transition ${
                          selectedLesson === lessonIndex
                            ? 'bg-blue-500 text-white'
                            : 'text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {lessonIndex + 1}. {lesson.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto h-[calc(100vh-73px)] p-8">
          {currentLesson && (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-white mb-6">{currentLesson.title}</h1>
              
              {/* Conteúdo da Lição */}
              <div className="prose prose-invert max-w-none mb-8">
                <div className="bg-slate-800/50 rounded-lg p-6 whitespace-pre-wrap text-slate-300">
                  {currentLesson.content}
                </div>
              </div>

              {/* Exemplos de Código */}
              {currentLesson.examples.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Exemplos de Código</h2>
                  {currentLesson.examples.map((example) => (
                    <div key={example.id} className="mb-6 bg-slate-800/50 rounded-lg overflow-hidden">
                      <div className="bg-slate-700 px-4 py-2 flex justify-between items-center">
                        <span className="text-white font-semibold">{example.title}</span>
                        <span className="text-sm text-slate-400">{example.language}</span>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-sm text-slate-300">{example.code}</code>
                      </pre>
                      <div className="px-4 py-3 bg-slate-900/50 text-slate-400 text-sm">
                        {example.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Fluxogramas */}
              {currentLesson.flowcharts.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Fluxogramas</h2>
                  {currentLesson.flowcharts.map((flowchart) => (
                    <div key={flowchart.id} className="mb-6 bg-slate-800/50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{flowchart.title}</h3>
                      <p className="text-slate-400 mb-4">{flowchart.description}</p>
                      <div className="bg-white rounded p-4">
                        <pre className="text-xs text-slate-900">{flowchart.mermaidCode}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Mapas Mentais */}
              {currentLesson.mindmaps.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Mapas Mentais</h2>
                  {currentLesson.mindmaps.map((mindmap) => (
                    <div key={mindmap.id} className="mb-6 bg-slate-800/50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{mindmap.title}</h3>
                      <p className="text-slate-400 mb-4">{mindmap.description}</p>
                      <div className="bg-white rounded p-4">
                        <pre className="text-xs text-slate-900">{mindmap.mermaidCode}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Navegação */}
              <div className="flex justify-between mt-12">
                <button
                  onClick={() => {
                    if (selectedLesson > 0) {
                      setSelectedLesson(selectedLesson - 1);
                    } else if (selectedModule > 0) {
                      setSelectedModule(selectedModule - 1);
                      setSelectedLesson(course.modules[selectedModule - 1].lessons.length - 1);
                    }
                  }}
                  disabled={selectedModule === 0 && selectedLesson === 0}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 rounded-lg transition"
                >
                  ← Lição Anterior
                </button>
                <button
                  onClick={() => {
                    if (selectedLesson < currentModule.lessons.length - 1) {
                      setSelectedLesson(selectedLesson + 1);
                    } else if (selectedModule < course.modules.length - 1) {
                      setSelectedModule(selectedModule + 1);
                      setSelectedLesson(0);
                    }
                  }}
                  disabled={
                    selectedModule === course.modules.length - 1 &&
                    selectedLesson === currentModule.lessons.length - 1
                  }
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-600 rounded-lg transition"
                >
                  Próxima Lição →
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Chat IA */}
      {chatOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-slate-800 border border-slate-700 rounded-lg shadow-2xl flex flex-col">
          <div className="bg-slate-700 px-4 py-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold text-white">Assistente IA</h3>
            <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white">
              ✕
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 ml-8'
                    : 'bg-slate-700 mr-8'
                }`}
              >
                <div className="text-sm text-white whitespace-pre-wrap">{msg.content}</div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                placeholder="Faça sua pergunta..."
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAskQuestion}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CourseGeneratorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />
      </div>
    }>
      <CourseGeneratorContent />
    </Suspense>
  );
}
