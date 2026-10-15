import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import { useAuth } from "./AuthContext";

function Private({ children }) {
  const { username } = useAuth();
  return username ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/upload" element={<Private><Upload /></Private>} />
        </Routes>
      </main>
    </>
  );
}