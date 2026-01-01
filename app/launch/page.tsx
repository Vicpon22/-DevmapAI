'use client';

import { useEffect } from 'react';

export default function LaunchPage() {
  useEffect(() => {
    const url = 'https://3000-igsrcj5tqfi8iyoo32uvn-dfc00ec5.sandbox.novita.ai/';
    const timer = setTimeout(() => {
      // attempt safe redirect to external sandbox URL
      window.location.href = url;
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200">
      <div className="text-center p-6 bg-slate-800 rounded-lg border border-slate-700">
        <h1 className="text-2xl font-bold mb-4">Abrindo seu site...</h1>
        <p className="mb-4">Se não redirecionar automaticamente, clique no link abaixo:</p>
        <a href="https://3000-igsrcj5tqfi8iyoo32uvn-dfc00ec5.sandbox.novita.ai/" target="_blank" rel="noreferrer" className="text-blue-400 underline">Abrir site</a>
      </div>
    </div>
  );
}
