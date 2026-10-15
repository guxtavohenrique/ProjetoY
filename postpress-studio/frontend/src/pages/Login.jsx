import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch {
      setError("Usuário ou senha incorretos.");
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Entrar</h1>
      <input placeholder="Usuário" value={username}
        onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Senha" value={password}
        onChange={(e) => setPassword(e.target.value)} required />
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit">Entrar</button>
      <p className="muted">Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
    </form>
  );
}