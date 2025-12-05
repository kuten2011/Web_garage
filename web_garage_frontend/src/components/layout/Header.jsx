import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header({ isScrolled, currentView, setCurrentView }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Trang chủ', id: 'home', view: 'home' },
    { label: 'Dịch vụ', id: 'services', view: 'home' },
    { label: 'Sản phẩm', id: 'products', view: 'home' },
    { label: 'Giới thiệu', id: 'about', view: 'home' },
    { label: 'Liên hệ', id: 'contact', view: 'home' },
  ];

  const handleNavClick = (item) => {
    if (item.view) {
      setCurrentView(item.view);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-gray-900 text-white transition-all ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-xl">
              G
            </div>
            <span className="text-xl md:text-2xl font-bold text-yellow-400">Web Garage</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-sm">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`hover:text-yellow-400 transition font-medium ${
                  currentView === item.view ? 'text-yellow-400' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`block w-full text-left py-2 hover:text-yellow-400 ${
                  currentView === item.view ? 'text-yellow-400' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}