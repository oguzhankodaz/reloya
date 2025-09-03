/** @format */
import { useState } from "react";
import { registerUser } from "../../../services/auth";
import { useNavigate } from "react-router";
import { Loader2, User, Mail, Lock, UserCircle } from "lucide-react";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const surname = formData.get("surname") as string;
    const password = formData.get("password") as string;

    if (!email || !username || !surname || !password) {
      alert("Lütfen tüm alanları doldurun ❌");
      setLoading(false);
      return;
    }

    try {
      await registerUser({ username, surname, email, password });
      alert("Kayıt başarılı ✅");
      navigate("/login-user");
    } catch (error) {
      alert("Register failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-5"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-indigo-600">Kayıt Ol</h2>
          <p className="text-gray-500 text-sm mt-2">
            ReloYa dünyasına katıl ve hemen keşfet 🚀
          </p>
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-posta adresi"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Username */}
        <div className="relative">
          <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Adınız"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Surname */}
        <div className="relative">
          <UserCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            id="surname"
            name="surname"
            placeholder="Soyadınız"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Şifre"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Kayıt Ol"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Zaten hesabınız var mı?{" "}
          <button
            type="button"
            onClick={() => navigate("/login-user")}
            className="text-indigo-600 font-medium hover:underline"
          >
            Giriş Yap
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
