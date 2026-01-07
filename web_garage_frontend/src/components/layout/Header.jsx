import { useState } from "react";
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
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header({ isScrolled }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Kiểm tra đăng nhập và role
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const maKH = userData.username || "";
  const isLoggedIn = !!token;

  let isStaff = false;
  if (isLoggedIn && userData) {
    try {
      const user = JSON.parse(userData);
      const authorities = user.authorities || [];
      const roles = authorities.map((auth) =>
        typeof auth === "string" ? auth : auth.authority
      );
      isStaff = !roles.includes("ROLE_CUSTOMER");
    } catch (e) {
      console.error("Lỗi parse user data");
    }
  }

  const menuItems = [
    { label: "Trang chủ", route: "/", icon: <Home size={18} /> },
    { label: "Dịch vụ",  route: "/services", icon: <Car size={18} /> },
    { label: "Sản phẩm", route: "/parts", icon: <Package size={18} /> },
    { label: "Giới thiệu", route: "/#about", icon: <Info size={18} /> },
    { label: "Liên hệ",  route: "/#contact", icon: <PhoneCall size={18} /> },
  ];

  // Thêm tab Phiếu Sửa Chữa ở cuối nếu đã đăng nhập (cả staff và customer đều thấy)
  const finalMenuItems = isLoggedIn
    ? [
        ...menuItems,
        { label: "Phiếu Sửa Chữa", route: "/my-repairs", icon: <ClipboardList size={18} /> },
        { label: maKH, route: "/account", icon: <User size={18} /> },
      ]
    : menuItems;

  // Nếu là staff thì thêm Quản trị ở đầu
  if (isStaff) {
    finalMenuItems.unshift({ label: "Quản trị", route: "/admin", icon: <Wrench size={18} /> });
  }

  const isActive = (itemRoute) => {
    if (itemRoute.includes("#")) {
      const [path, hash] = itemRoute.split("#");
      return location.pathname === path && location.hash === `#${hash}`;
    }
    return location.pathname === itemRoute;
  };

  const handleNavClick = (item) => {
    navigate(item.route);
    setIsMenuOpen(false);
  };

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
      window.location.reload();
    } else {
      navigate("/login");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-gray-900 text-white transition-all ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-xl">
              G
            </div>
            <span className="text-xl md:text-2xl font-bold text-yellow-400">
              Web Garage
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            {finalMenuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`hover:text-yellow-400 transition font-medium flex items-center gap-2 ${
                  isActive(item.route) ? "text-yellow-400" : ""
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}

            <button
              onClick={handleAuth}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-full font-bold hover:bg-yellow-500 transition"
            >
              {isLoggedIn ? (
                <>
                  <LogOut size={18} />
                  Đăng xuất
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Đăng nhập
                </>
              )}
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {finalMenuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`block w-full text-left py-3 hover:text-yellow-400 font-medium flex items-center gap-3 ${
                  isActive(item.route) ? "text-yellow-400" : ""
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}

            <button
              onClick={handleAuth}
              className="block w-full text-left py-3 flex items-center gap-3 hover:text-yellow-400 font-medium"
            >
              {isLoggedIn ? (
                <>
                  <LogOut size={20} />
                  Đăng xuất
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Đăng nhập
                </>
              )}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}