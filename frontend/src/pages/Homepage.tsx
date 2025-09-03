/** @format */
import { useNavigate } from "react-router";
import { ArrowRight, LogIn, UserPlus, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Homepage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const api = import.meta.env.VITE_API_URL;

        const res = await axios.get(`${api}/auth/me`, {
          withCredentials: true,
        });

        if (res.data?.user) {
          if (res.data.user.role === 1) {
            navigate("/company-dashboard");
          } else if (res.data.user.role === 2) {
            navigate("/user-dashboard");
          }
        }
      } catch (error) {
        // kullanıcı yoksa sorun değil
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <p className="text-center mt-10">Kontrol ediliyor...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white px-6">
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
          ReloYa
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/90">
          Müşteri sadakatini artır, satışlarını büyüt. Kullanıcılarınızla güçlü
          bağlar kurun.
        </p>
      </div>

      {/* Buttons Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
        {/* User Login */}
        <button
          onClick={() => navigate("/login-user")}
          className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-yellow-400 text-gray-900 font-semibold shadow-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
        >
          <LogIn className="w-5 h-5" /> Kullanıcı Girişi
        </button>

        {/* User Register */}
        <button
          onClick={() => navigate("/register-user")}
          className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-green-400 text-gray-900 font-semibold shadow-lg hover:bg-green-500 transition-all duration-300 transform hover:scale-105"
        >
          <UserPlus className="w-5 h-5" /> Kullanıcı Kaydı
        </button>

        {/* Company Login */}
        <button
          onClick={() => navigate("/login-company")}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/20 text-white font-medium shadow-md hover:bg-white/30 transition"
        >
          <Building2 className="w-5 h-5" /> Şirket Girişi
        </button>

        {/* Company Register */}
        <button
          onClick={() => navigate("/register-company")}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/20 text-white font-medium shadow-md hover:bg-white/30 transition"
        >
          <ArrowRight className="w-5 h-5" /> Şirket Kaydı
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-white/70 text-sm">
        © {new Date().getFullYear()} ReloYa SaaS. Tüm hakları saklıdır.
      </footer>
    </div>
  );
};

export default Homepage;
