import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Upload() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return setError("Escolha uma imagem.");

    const data = new FormData();
    data.append("title", title);
    data.append("image", file);

    setSending(true);
    try {
      await api.post("/photos/", data);
      navigate("/");
    } catch {
      setError("Não foi possível enviar. Tente novamente.");
      setSending(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Enviar foto</h1>
      <input type="file" accept="image/*"
        onChange={(e) => setFile(e.target.files[0])} />
      <input placeholder="Título (opcional)" value={title}
        onChange={(e) => setTitle(e.target.value)} />
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit" disabled={sending}>
        {sending ? "Enviando..." : "Publicar"}
      </button>
    </form>
  );
}