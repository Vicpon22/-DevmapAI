import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const [cursos, setCursos] = useState([]);
  const [tema, setTema] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  const fetchCursos = async () => {
    try {
      const response = await axios.get("/api/cursos", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setCursos(response.data);
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const fetchUsuario = async () => {
    try {
      const response = await axios.get("/api/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setUsuario(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  useEffect(() => {
    fetchCursos();
    fetchUsuario();
  }, []);

  const handleGerarCurso = async (e) => {
    e.preventDefault();
    if (!tema.trim()) return;
    
    setCarregando(true);
    try {
      await axios.post(
        "/api/gerar-curso",
        { tema },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setTema("");
      fetchCursos();
    } catch (error) {
      console.error("Erro ao gerar curso:", error);
      alert("Erro ao gerar curso. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🎓 Tech Courses Platform</h1>
          <div className="header-actions">
            {usuario && <span className="user-name">👤 {usuario.nome}</span>}
            <button onClick={handleLogout} className="btn-logout">
              🚪 Sair
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="gerar-curso-section">
          <h2>➕ Gerar Novo Curso</h2>
          <form onSubmit={handleGerarCurso} className="gerar-curso-form">
            <input
              type="text"
              placeholder="Digite o tema do curso (ex: Inteligência Artificial, React.js, Python...)"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              disabled={carregando}
            />
            <button type="submit" disabled={carregando || !tema.trim()}>
              {carregando ? "⏳ Gerando..." : "🚀 Gerar Curso com IA"}
            </button>
          </form>
          {carregando && (
            <p className="loading-message">
              ⏳ Gerando roadmap detalhado com IA... Isso pode levar alguns segundos.
            </p>
          )}
        </section>

        <section className="cursos-section">
          <h2>📚 Meus Cursos</h2>
          
          {cursos.length === 0 ? (
            <div className="empty-state">
              <p>📭 Nenhum curso encontrado.</p>
              <p>Comece gerando seu primeiro curso acima!</p>
            </div>
          ) : (
            <div className="cursos-grid">
              {cursos.map((curso) => (
                <div
                  key={curso.id}
                  className="curso-card"
                  onClick={() => navigate(`/curso/${curso.id}`)}
                >
                  <div className="curso-card-header">
                    <h3>{curso.titulo}</h3>
                  </div>
                  <div className="curso-card-body">
                    <p className="curso-descricao">{curso.descricao}</p>
                    <div className="curso-meta">
                      <span className="curso-duracao">⏱️ {curso.duracao}</span>
                    </div>
                  </div>
                  <div className="curso-card-footer">
                    <button className="btn-ver-curso">
                      👁️ Ver Curso
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
