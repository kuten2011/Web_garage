import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@gara.com"); // Để test nhanh
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/web_garage/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          // Quan trọng: cho phép cookie nếu dùng credentials (tùy chọn)
          withCredentials: false,
        }
      );

      // Lưu token và thông tin user
      localStorage.setItem("token", res.data.jwt);
      localStorage.setItem("user", JSON.stringify(res.data));

      console.log("Đăng nhập thành công! Token:", res.data.jwt);

      // Chuyển hướng đến trang admin
      navigate("/admin", { replace: true });

    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      if (err.response?.status === 401) {
        setError("Sai email hoặc mật khẩu!");
      } else if (err.response?.status === 403) {
        setError("Tài khoản bị khóa hoặc không có quyền!");
      } else {
        setError("Lỗi kết nối server. Vui lòng thử lại!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-96 transform transition hover:scale-105">
        <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          ĐĂNG NHẬP ADMIN
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email nhân viên"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 mb-6 border-2 border-gray-300 rounded-2xl text-lg focus:outline-none focus:border-indigo-500 transition"
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 mb-6 border-2 border-gray-300 rounded-2xl text-lg focus:outline-none focus:border-indigo-500 transition"
            required
            disabled={loading}
          />
          {error && (
            <p className="text-red-600 text-center mb-4 font-medium bg-red-100 py-3 rounded-lg">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-xl shadow-2xl transition transform hover:-translate-y-1
              ${loading 
                ? "bg-gray-400 cursor-not-allowed text-gray-700" 
                : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-3xl"
              }`}
          >
            {loading ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-6 text-sm">
          Gợi ý: admin@gara.com / 123456
        </p>
      </div>
    </div>
  );
}