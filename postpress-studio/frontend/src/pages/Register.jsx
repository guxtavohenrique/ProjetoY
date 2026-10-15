import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/");
    } catch {
      setError("Não foi possível cadastrar. Esse usuário já pode existir.");
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Criar conta</h1>
      <input placeholder="Usuário" value={username}
        onChange={(e) => setUsername(e.target.value)} required />
      <input type="email" placeholder="E-mail" value={email}
        onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Senha" value={password}
        onChange={(e) => setPassword(e.target.value)} required />
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit">Cadastrar</button>
      <p className="muted">Já tem conta? <Link to="/login">Entrar</Link></p>
    </form>
  );
}