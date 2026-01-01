'use client';

import { useState } from 'react';
import { ArrowLeft, Play, CheckCircle, XCircle, Code, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export default function LabPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState<Array<{passed: boolean, message: string}>>([]);

  const challenges = [
    {
      id: 1,
      title: 'Soma de Números',
      description: 'Crie uma função que recebe dois números e retorna a soma deles.',
      difficulty: 'easy',
      language: 'python',
      starterCode: `def soma(a, b):
    # Seu código aqui
    pass

# Teste
print(soma(5, 3))`,
      tests: [
        { input: 'soma(5, 3)', expected: '8', description: 'Soma de 5 + 3 deve retornar 8' },
        { input: 'soma(10, 20)', expected: '30', description: 'Soma de 10 + 20 deve retornar 30' },
      ]
    },
    {
      id: 2,
      title: 'Palíndromo',
      description: 'Verifique se uma string é um palíndromo (lê-se igual de trás para frente).',
      difficulty: 'medium',
      language: 'python',
      starterCode: `def eh_palindromo(texto):
    # Seu código aqui
    pass

# Teste
print(eh_palindromo("arara"))`,
      tests: [
        { input: 'eh_palindromo("arara")', expected: 'True', description: 'Arara é palíndromo' },
        { input: 'eh_palindromo("python")', expected: 'False', description: 'Python não é palíndromo' },
      ]
    },
    {
      id: 3,
      title: 'FizzBuzz',
      description: 'Implemente o clássico FizzBuzz: números divisíveis por 3 retornam "Fizz", por 5 retornam "Buzz", por ambos retornam "FizzBuzz".',
      difficulty: 'easy',
      language: 'javascript',
      starterCode: `function fizzBuzz(n) {
    // Seu código aqui
}

// Teste
console.log(fizzBuzz(15));`,
      tests: [
        { input: 'fizzBuzz(3)', expected: 'Fizz', description: '3 é divisível por 3' },
        { input: 'fizzBuzz(5)', expected: 'Buzz', description: '5 é divisível por 5' },
        { input: 'fizzBuzz(15)', expected: 'FizzBuzz', description: '15 é divisível por 3 e 5' },
      ]
    },
    {
      id: 4,
      title: 'Ordenação de Array',
      description: 'Implemente uma função que ordena um array de números em ordem crescente.',
      difficulty: 'medium',
      language: 'javascript',
      starterCode: `function ordenar(arr) {
    // Seu código aqui
    // Não use sort() - implemente seu próprio algoritmo
}

// Teste
console.log(ordenar([5, 2, 8, 1, 9]));`,
      tests: [
        { input: 'ordenar([5, 2, 8, 1, 9])', expected: '[1, 2, 5, 8, 9]', description: 'Array ordenado corretamente' },
      ]
    },
    {
      id: 5,
      title: 'Classe Pessoa',
      description: 'Crie uma classe Pessoa com propriedades nome e idade, e um método apresentar().',
      difficulty: 'medium',
      language: 'java',
      starterCode: `public class Pessoa {
    // Seu código aqui
    
    public static void main(String[] args) {
        Pessoa p = new Pessoa("João", 25);
        p.apresentar();
    }
}`,
      tests: [
        { input: 'new Pessoa("João", 25).apresentar()', expected: 'Olá, meu nome é João e tenho 25 anos', description: 'Apresentação correta' },
      ]
    },
  ];

  const currentChallenge = challenges[selectedChallenge];

  useState(() => {
    setCode(currentChallenge.starterCode);
  });

  const runCode = () => {
    // Simulação de execução (em produção, usar sandbox seguro)
    setOutput('Código executado!\n\nNota: Esta é uma simulação. Em produção, o código seria executado em um ambiente seguro.');
    
    // Simular testes
    const results = currentChallenge.tests.map(test => ({
      passed: Math.random() > 0.3, // Simulação
      message: test.description
    }));
    
    setTestResults(results);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return difficulty;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition">
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </Link>
            <h1 className="text-xl font-bold text-white">Laboratório Virtual de Programação</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar - Desafios */}
        <aside className="w-80 border-r border-slate-700 bg-slate-900/50 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-bold text-white mb-4">Desafios</h2>
            <div className="space-y-2">
              {challenges.map((challenge, index) => (
                <button
                  key={challenge.id}
                  onClick={() => {
                    setSelectedChallenge(index);
                    setCode(challenge.starterCode);
                    setOutput('');
                    setTestResults([]);
                  }}
                  className={`w-full text-left p-4 rounded-lg transition ${
                    selectedChallenge === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{challenge.title}</span>
                    <span className={`text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                      {getDifficultyLabel(challenge.difficulty)}
                    </span>
                  </div>
                  <div className="text-sm opacity-75 line-clamp-2">{challenge.description}</div>
                  <div className="text-xs mt-2 opacity-60">{challenge.language.toUpperCase()}</div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Área Principal */}
        <main className="flex-1 flex flex-col">
          {/* Descrição do Desafio */}
          <div className="border-b border-slate-700 bg-slate-900/50 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{currentChallenge.title}</h2>
                <p className="text-slate-300 mb-4">{currentChallenge.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className={`font-semibold ${getDifficultyColor(currentChallenge.difficulty)}`}>
                    Dificuldade: {getDifficultyLabel(currentChallenge.difficulty)}
                  </span>
                  <span className="text-slate-400">
                    Linguagem: {currentChallenge.language.toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                onClick={runCode}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition font-semibold"
              >
                <Play className="w-5 h-5" />
                Executar Código
              </button>
            </div>
          </div>

          {/* Editor e Output */}
          <div className="flex-1 flex">
            {/* Editor de Código */}
            <div className="flex-1 flex flex-col border-r border-slate-700">
              <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
                <span className="text-slate-300 font-semibold">Editor</span>
                <Code className="w-4 h-4 text-slate-400" />
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-slate-900 text-slate-300 font-mono text-sm p-4 resize-none focus:outline-none"
                spellCheck={false}
              />
            </div>

            {/* Output e Testes */}
            <div className="w-1/3 flex flex-col bg-slate-900/50">
              <div className="bg-slate-800 px-4 py-2 border-b border-slate-700">
                <span className="text-slate-300 font-semibold">Resultado</span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {/* Output */}
                {output && (
                  <div className="mb-4">
                    <h3 className="text-white font-semibold mb-2">Saída:</h3>
                    <pre className="bg-slate-800 p-3 rounded text-sm text-slate-300 whitespace-pre-wrap">
                      {output}
                    </pre>
                  </div>
                )}

                {/* Testes */}
                {testResults.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-2">Testes:</h3>
                    <div className="space-y-2">
                      {testResults.map((result, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded flex items-start gap-2 ${
                            result.passed
                              ? 'bg-green-900/30 border border-green-700'
                              : 'bg-red-900/30 border border-red-700'
                          }`}
                        >
                          {result.passed ? (
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className={`text-sm font-semibold ${result.passed ? 'text-green-300' : 'text-red-300'}`}>
                              {result.passed ? 'Passou' : 'Falhou'}
                            </div>
                            <div className="text-sm text-slate-400">{result.message}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dica */}
                {!output && (
                  <div className="bg-blue-900/20 border border-blue-700 rounded p-4">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-blue-300 font-semibold mb-1">Dica</h4>
                        <p className="text-sm text-slate-400">
                          Escreva seu código no editor e clique em "Executar Código" para testar sua solução.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
