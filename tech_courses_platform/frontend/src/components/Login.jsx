import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [modo, setModo] = useState("login"); // "login" ou "cadastro"
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setCarregando(true);

    try {
      if (modo === "login") {
        // Login
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', senha);
        
        const response = await axios.post("/api/login", formData);
        localStorage.setItem("token", response.data.access_token);
        navigate("/dashboard");
      } else {
        // Cadastro
        await axios.post("/api/cadastro", {
          email,
          password: senha,
          nome: nome || email.split("@")[0]
        });
        setSucesso("Cadastro realizado com sucesso! Faça login.");
        setModo("login");
        setSenha("");
      }
    } catch (error) {
      setErro(
        error.response?.data?.detail || 
        "Erro ao " + (modo === "login" ? "autenticar" : "cadastrar")
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🎓 Tech Courses Platform</h1>
          <p>Plataforma de cursos de tecnologia com IA</p>
        </div>

        <div className="login-tabs">
          <button
            className={modo === "login" ? "tab-active" : "tab-inactive"}
            onClick={() => {
              setModo("login");
              setErro("");
              setSucesso("");
            }}
          >
            Login
          </button>
          <button
            className={modo === "cadastro" ? "tab-active" : "tab-inactive"}
            onClick={() => {
              setModo("cadastro");
              setErro("");
              setSucesso("");
            }}
          >
            Cadastro
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {modo === "cadastro" && (
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required={modo === "cadastro"}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {erro && (
            <div className="alert alert-error">
              ⚠️ {erro}
            </div>
          )}

          {sucesso && (
            <div className="alert alert-success">
              ✅ {sucesso}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={carregando}
          >
            {carregando 
              ? "⏳ Carregando..." 
              : modo === "login" ? "🔓 Entrar" : "📝 Cadastrar"
            }
          </button>
        </form>

        <div className="login-footer">
          {modo === "login" ? (
            <p>
              Não tem conta?{" "}
              <button 
                onClick={() => setModo("cadastro")}
                className="link-button"
              >
                Criar conta
              </button>
            </p>
          ) : (
            <p>
              Já tem conta?{" "}
              <button 
                onClick={() => setModo("login")}
                className="link-button"
              >
                Fazer login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
