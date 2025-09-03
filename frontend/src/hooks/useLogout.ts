// src/hooks/useLogout.ts
import axios from "axios";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const api = import.meta.env.VITE_API_URL;

      await axios.post(`${api}/auth/logout`, {}, { withCredentials: true });
      navigate("/"); // login sayfasına yönlendir
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return logout;
};
