import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Curso from './pages/Curso';
import './App.css';

// Componente de rota protegida
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/curso/:id"
          element={
            <ProtectedRoute>
              <Curso />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
