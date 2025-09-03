/** @format */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { LogOut, QrCode } from "lucide-react";
import { useLogout } from "../../../hooks/useLogout";
import QrPage from "../../../components/qr/QrPage";

interface User {
  userId: string;
  email: string;
  name?: string;
}

const UserDashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQr, setShowQr] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/me", {
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
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 px-6 text-white">
      {/* Çıkış Yap Butonu - sağ üst köşeye */}
      <button
        onClick={logout}
        className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 font-semibold shadow-md transition"
      >
        <LogOut className="w-5 h-5" /> Çıkış
      </button>

      {/* App Name */}
      <h1 className="text-4xl font-extrabold drop-shadow-lg mb-8">ReLoya</h1>

      {/* Welcome Card */}
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center">
        <h2 className="text-2xl font-semibold">
          Hoş geldiniz,{" "}
          <span className="text-yellow-300">{user.name || "Kullanıcı"}</span> 🎉
        </h2>
        <p className="mt-2 text-sm text-gray-200">
          Kullanıcı kontrol paneline giriş yaptınız.
        </p>

        {/* QR Kod */}
        {showQr && (
          <div className="mt-6 flex justify-center">
            <QrPage id={user.userId} />
          </div>
        )}
      </div>

      {/* QR Okut Butonu - alta */}
      <button
        onClick={() => setShowQr(!showQr)}
        className="mt-10 flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-400 text-gray-900 font-semibold shadow-md hover:bg-yellow-500 transition"
      >
        <QrCode className="w-5 h-5" />
        {showQr ? "QR Kapat" : "QR Okut"}
      </button>
    </div>
  );
};

export default UserDashboardPage;
