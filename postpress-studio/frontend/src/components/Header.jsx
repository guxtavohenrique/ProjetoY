import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Header() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header">
      <Link to="/" className="logo">Fotos</Link>
      <nav>
        {username ? (
          <>
            <Link to="/upload" className="btn">Enviar foto</Link>
            <button
              className="link"
              onClick={() => { logout(); navigate("/"); }}
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="link">Entrar</Link>
            <Link to="/cadastro" className="btn">Cadastrar</Link>
          </>
        )}
      </nav>
    </header>
  );
}