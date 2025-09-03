/** @format */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import { useLogout } from "../../../hooks/useLogout";

interface User {
  userId: string;
  email: string;
  name?: string;
}

const CompanyDashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const logout = useLogout();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const api = import.meta.env.VITE_API_URL;

        const res = await axios.get(`${api}/auth/me`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("User fetch error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/"); // login sayfasına yönlendir
    }
  }, [loading, user, navigate]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-6 text-white">
      {/* App Name */}
      <h1 className="text-4xl font-extrabold drop-shadow-lg mb-8">ReloYa</h1>

      {/* Welcome Card */}
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center">
        <h2 className="text-2xl font-semibold">
          Hoş geldiniz,{" "}
          <span className="text-yellow-300">{user.name || "Kullanıcı"}</span> 🎉
        </h2>
        <p className="mt-2 text-sm text-gray-200">
          Şirket kontrol paneline giriş yaptınız.
        </p>
      </div>

      {/* Actions */}
      <button
        onClick={logout}
        className="mt-10 flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 font-semibold shadow-md transition"
      >
        <LogOut className="w-5 h-5" /> Çıkış Yap
      </button>
    </div>
  );
};

export default CompanyDashboardPage;
