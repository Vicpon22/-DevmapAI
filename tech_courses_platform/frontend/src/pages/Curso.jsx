import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Curso.css';

export default function Curso() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);
  const [materiais, setMateriais] = useState([]);
  const [duvida, setDuvida] = useState("");
  const [resposta, setResposta] = useState("");
  const [carregandoDuvida, setCarregandoDuvida] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetchCurso();
    fetchMateriais();
  }, [id]);

  const fetchCurso = async () => {
    try {
      const response = await axios.get(`/api/cursos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setCurso(response.data);
    } catch (error) {
      console.error("Erro ao buscar curso:", error);
      if (error.response?.status === 404) {
        alert("Curso não encontrado");
        navigate("/dashboard");
      }
    } finally {
      setCarregando(false);
    }
  };

  const fetchMateriais = async () => {
    try {
      const response = await axios.get(`/api/cursos/${id}/materiais`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setMateriais(response.data);
    } catch (error) {
      console.error("Erro ao buscar materiais:", error);
    }
  };

  const handlePerguntar = async (e) => {
    e.preventDefault();
    if (!duvida.trim()) return;

    setCarregandoDuvida(true);
    setResposta("");

    try {
      const response = await axios.post(
        `/api/responder-duvida`,
        { curso_id: parseInt(id), pergunta: duvida },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setResposta(response.data.resposta);
      setDuvida("");
    } catch (error) {
      console.error("Erro ao responder dúvida:", error);
      alert("Erro ao processar sua dúvida. Tente novamente.");
    } finally {
      setCarregandoDuvida(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(`/api/cursos/${id}/pdf`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${curso.titulo.replace(/\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao baixar PDF:", error);
      alert("Erro ao baixar PDF. Tente novamente.");
    }
  };

  if (carregando) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando curso...</p>
      </div>
    );
  }

  if (!curso) {
    return <div className="loading-container"><p>Curso não encontrado</p></div>;
  }

  return (
    <div className="curso-container">
      <header className="curso-header">
        <div className="header-content">
          <button onClick={() => navigate("/dashboard")} className="btn-back">
            ← Voltar
          </button>
          <h1>{curso.titulo}</h1>
          <button onClick={handleDownloadPDF} className="btn-download">
            📥 Baixar PDF
          </button>
        </div>
      </header>

      <main className="curso-main">
        <div className="curso-layout">
          <div className="roadmap-section">
            <div className="roadmap-card">
              <h2>📋 Roadmap do Curso</h2>
              <div className="roadmap-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {curso.roadmap}
                </ReactMarkdown>
              </div>
            </div>

            {materiais.length > 0 && (
              <div className="materiais-card">
                <h2>📚 Materiais Complementares</h2>
                <ul className="materiais-list">
                  {materiais.map((material) => (
                    <li key={material.id} className="material-item">
                      <span className="material-tipo">{getMaterialIcon(material.tipo)}</span>
                      <div className="material-info">
                        <strong>{material.titulo}</strong>
                        <p>{material.conteudo}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="chat-section">
            <div className="chat-card">
              <h2>💬 Chat com IA</h2>
              <p className="chat-description">
                Tire suas dúvidas sobre o curso com nossa IA assistente
              </p>

              <form onSubmit={handlePerguntar} className="chat-form">
                <textarea
                  value={duvida}
                  onChange={(e) => setDuvida(e.target.value)}
                  placeholder="Digite sua dúvida aqui..."
                  rows="4"
                  disabled={carregandoDuvida}
                />
                <button
                  type="submit"
                  disabled={carregandoDuvida || !duvida.trim()}
                >
                  {carregandoDuvida ? "⏳ Processando..." : "🚀 Enviar"}
                </button>
              </form>

              {resposta && (
                <div className="resposta-card">
                  <h3>🤖 Resposta da IA:</h3>
                  <div className="resposta-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {resposta}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function getMaterialIcon(tipo) {
  const icons = {
    'PDF': '📄',
    'Link': '🔗',
    'Livro': '📚',
    'Vídeo': '🎥',
    'Artigo': '📝',
    'Documentação': '📖'
  };
  return icons[tipo] || '📎';
}
