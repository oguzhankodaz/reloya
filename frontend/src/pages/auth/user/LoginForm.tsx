/** @format */
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import { LogIn, Mail, Lock } from "lucide-react";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginUser = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await axios.post("http://localhost:5000/auth/login-user", data, {
        withCredentials: true, // ✅ cookie için
      });

      navigate("/user-dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Login failed ❌");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 px-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-indigo-600 drop-shadow-sm">
            Kullanıcı Girişi
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            Hesabınıza giriş yaparak avantajlardan yararlanın
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="ornek@mail.com"
                className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                {...register("email", {
                  required: "E-posta zorunlu",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Geçerli bir e-posta girin",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Şifre
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                {...register("password", {
                  required: "Şifre zorunlu",
                  minLength: { value: 6, message: "En az 6 karakter olmalı" },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
          >
            <LogIn className="w-5 h-5" /> Giriş Yap
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Hesabınız yok mu?{" "}
          <button
            onClick={() => navigate("/register-user")}
            className="text-indigo-600 font-medium hover:underline"
          >
            Kayıt Ol
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
