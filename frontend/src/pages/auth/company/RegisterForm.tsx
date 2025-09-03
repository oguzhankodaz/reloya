/** @format */
import { useState } from "react";
import { registerCompany } from "../../../services/auth";
import { useNavigate } from "react-router";
import { Mail, User, Lock, Loader2 } from "lucide-react";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!email || !username  || !password) {
      alert("Lütfen tüm alanları doldurun ❌");
      setLoading(false);
      return;
    }

    try {
      await registerCompany({ username, email, password });
      alert("Kayıt başarılı ✅");
      navigate("/login-company");
    } catch (error) {
      alert("Register failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-indigo-600 drop-shadow-sm">
            Şirket Kaydı
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            Şirket hesabınızı oluşturarak panele erişin
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-posta adresi"
              className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Şirket Adı"
              className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
              className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Kaydediliyor...
              </>
            ) : (
              "Kayıt Ol"
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Zaten hesabınız var mı?{" "}
          <button
            onClick={() => navigate("/login-company")}
            className="text-indigo-600 font-medium hover:underline"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
