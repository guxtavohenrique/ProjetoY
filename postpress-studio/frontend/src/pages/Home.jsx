import { useEffect, useState } from "react";
import api, { API_URL } from "../api";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/photos/")
      .then((res) => setPhotos(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="muted">Carregando...</p>;
  if (!photos.length)
    return <p className="muted">Ainda não há fotos. Seja o primeiro a enviar!</p>;

  return (
    <div className="grid">
      {photos.map((p) => (
        <figure key={p.id} className="card">
          <img src={p.image} alt={p.title || "Foto"} loading="lazy" />
          <figcaption>
            <span>
              {p.title}
              <small>por {p.owner}</small>
            </span>
            <a href={`${API_URL}/api/photos/${p.id}/download/`}>Baixar</a>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}