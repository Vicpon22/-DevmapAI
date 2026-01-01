import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Learning Platform - Plataforma de Educação com IA',
  description: 'Sistema inteligente para criação e aprendizado de cursos de tecnologia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {children}
      </body>
    </html>
  )
}
