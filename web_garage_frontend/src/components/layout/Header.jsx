import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header({ isScrolled }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          <nav className="hidden md:flex space-x-8 text-sm">
            <a href="#home" className="hover:text-yellow-400 transition">Trang chủ</a>
            <a href="#services" className="hover:text-yellow-400 transition">Dịch vụ</a>
            <a href="#products" className="hover:text-yellow-400 transition">Sản phẩm</a>
            <a href="#about" className="hover:text-yellow-400 transition">Giới thiệu</a>
            <a href="#contact" className="hover:text-yellow-400 transition">Liên hệ</a>
          </nav>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {['home', 'services', 'products', 'about', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="block py-2 hover:text-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                {item === 'home' ? 'Trang chủ' : item === 'services' ? 'Dịch vụ' : item === 'products' ? 'Sản phẩm' : item === 'about' ? 'Giới thiệu' : 'Liên hệ'}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}