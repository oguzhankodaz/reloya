// src/hooks/useLogout.ts
import axios from "axios";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
      navigate("/"); // login sayfasına yönlendir
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return logout;
};
