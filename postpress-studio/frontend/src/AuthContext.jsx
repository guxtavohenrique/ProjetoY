import { createContext, useContext, useState } from "react";
import api from "./api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(localStorage.getItem("username"));

  async function login(user, password) {
    const { data } = await api.post("/login/", { username: user, password });
    localStorage.setItem("access", data.access);
    localStorage.setItem("username", user);
    setUsername(user);
  }

  async function register(user, email, password) {
    await api.post("/register/", { username: user, email, password });
    await login(user, password);
  }

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("username");
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ username, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}