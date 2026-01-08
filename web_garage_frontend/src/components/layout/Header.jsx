import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  Menu,
  X,
  LogIn,
  LogOut,
  Wrench,
  Home,
  Car,
  Package,
  Info,
  PhoneCall,
  ClipboardList,
  User,
  Edit3,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header({ isScrolled }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ===== AUTH =====
  const token = localStorage.getItem("token");
  const rawUserData = localStorage.getItem("user");
  const userData = rawUserData ? JSON.parse(rawUserData) : {};
  const maKH = userData.username || "";
  const isLoggedIn = !!token;

  // ===== ROLE =====
  let isStaff = false;
  if (isLoggedIn && userData.authorities) {
    const roles = (userData.authorities || []).map((a) =>
      typeof a === "string" ? a : a.authority
    );
    isStaff = roles.some((r) => r !== "ROLE_CUSTOMER");
  }

  // ===== FORM =====
  const [formData, setFormData] = useState({
    hoTen: "",
    sdt: "",
    email: "",
    diaChi: "",
    matKhauMoi: "",
    xacNhanMatKhau: "",
  });

  // ===== LOAD ACCOUNT =====
  useEffect(() => {
    if (!showAccountPopup || !isLoggedIn) return;

    const fetchAccount = async () => {
      try {
        const apiUrl = isStaff
          ? `http://localhost:8080/admin/employees/${maKH}`
          : `http://localhost:8080/api/customers/${maKH}`;

        const res = await axiosInstance.get(apiUrl);
        setFormData({
          hoTen: res.data.hoTen || "",
          sdt: res.data.sdt || "",
          email: res.data.email || "",
          diaChi: res.data.diaChi || "",
          matKhauMoi: "",
          xacNhanMatKhau: "",
        });
      } catch {
        alert("Không thể tải thông tin tài khoản");
        setShowAccountPopup(false);
      }
    };

    fetchAccount();
  }, [showAccountPopup, isLoggedIn, maKH, isStaff]);

  // ===== MENU =====
  const menuItems = [
    { label: "Trang chủ", route: "/", icon: <Home size={18} /> },
    { label: "Dịch vụ", route: "/services", icon: <Car size={18} /> },
    { label: "Sản phẩm", route: "/parts", icon: <Package size={18} /> },
    { label: "Giới thiệu", route: "/#about", icon: <Info size={18} /> },
    { label: "Liên hệ", route: "/#contact", icon: <PhoneCall size={18} /> },
  ];

  let finalMenuItems = isLoggedIn
    ? [
        ...menuItems,
        {
          label: "Phiếu sửa chữa",
          route: "/my-repairs",
          icon: <ClipboardList size={18} />,
        },
      ]
    : menuItems;

  if (isStaff) {
    finalMenuItems.unshift({
      label: "Quản trị",
      route: "/admin",
      icon: <Wrench size={18} />,
    });
  }

  const handleNavClick = (route) => {
    navigate(route);
    setIsMenuOpen(false);
  };

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    } else {
      navigate("/login");
    }
  };

  // ===== SAVE =====
  const handleSaveAccount = async () => {
    if (processing) return;
    setProcessing(true);

    try {
      if (
        (formData.matKhauMoi || formData.xacNhanMatKhau) &&
        formData.matKhauMoi !== formData.xacNhanMatKhau
      ) {
        alert("Mật khẩu không khớp");
        return;
      }

      const payload = {
        hoTen: formData.hoTen,
        sdt: formData.sdt,
        email: formData.email,
        diaChi: formData.diaChi,
      };

      if (formData.matKhauMoi) payload.matKhau = formData.matKhauMoi;

      const apiUrl = isStaff
        ? `http://localhost:8080/admin/employees/${maKH}`
        : `http://localhost:8080/api/customers/${maKH}`;

      await axiosInstance.patch(apiUrl, payload);

      if (formData.matKhauMoi) {
        alert("Đổi mật khẩu thành công, vui lòng đăng nhập lại");
        localStorage.clear();
        navigate("/login");
        return;
      }

      alert("Cập nhật thành công");
      setShowAccountPopup(false);
    } catch {
      alert("Cập nhật thất bại");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white">
      <div className="flex items-center justify-between px-6 py-4">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          GARAGE
        </h1>

        <nav className="hidden md:flex gap-6">
          {finalMenuItems.map((item) => (
            <button
              key={item.route}
              onClick={() => handleNavClick(item.route)}
              className="flex items-center gap-2 hover:text-indigo-400"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <button onClick={() => setShowAccountPopup(true)}>
              <User />
            </button>
          )}
          <button onClick={handleAuth}>
            {isLoggedIn ? <LogOut /> : <LogIn />}
          </button>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-4 space-y-4">
          {finalMenuItems.map((item) => (
            <div
              key={item.route}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNavClick(item.route)}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      )}

      {/* POPUP */}
      {showAccountPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black p-8 rounded-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Chỉnh sửa thông tin</h2>

            {["hoTen", "sdt", "email", "diaChi"].map((f) => (
              <input
                key={f}
                placeholder={f}
                value={formData[f]}
                onChange={(e) =>
                  setFormData({ ...formData, [f]: e.target.value })
                }
                className="w-full border p-3 rounded mb-3"
              />
            ))}

            <input
              type="password"
              placeholder="Mật khẩu mới"
              value={formData.matKhauMoi}
              onChange={(e) =>
                setFormData({ ...formData, matKhauMoi: e.target.value })
              }
              className="w-full border p-3 rounded mb-3"
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={formData.xacNhanMatKhau}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  xacNhanMatKhau: e.target.value,
                })
              }
              className="w-full border p-3 rounded mb-6"
            />

            <div className="flex justify-end gap-4">
              <button onClick={() => setShowAccountPopup(false)}>Hủy</button>
              <button
                onClick={handleSaveAccount}
                className="bg-indigo-600 text-white px-6 py-2 rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
