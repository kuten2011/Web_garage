// src/components/ui/FloatingButtons.jsx
import { Phone, MessageCircle, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

export default function FloatingButtons() {
  return (
    <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-50">
      {/* Nút Gọi điện & Chat (góc dưới phải) */}
      <div className="flex flex-col gap-4">
        <a
          href="tel:0944799819"
          className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-red-700 transition-all hover:scale-110 animate-pulse"
          aria-label="Gọi ngay"
        >
          <Phone size={28} />
        </a>

        <a
          href="https://zalo.me/0944799819"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:from-green-600 hover:to-emerald-700 transition-all hover:scale-110"
          aria-label="Chat Zalo"
        >
          <MessageCircle size={28} />
        </a>
      </div>

      {/* Nút vào Admin – chỉ hiện khi ở trang khách */}
      <Link
        to="/admin"
        className="group flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-indigo-500/50 transition-all hover:scale-105 hover:-translate-y-1"
      >
        <Wrench className="w-8 h-8 group-hover:rotate-45 transition-transform" />
        <span className="font-bold text-lg tracking-wider">QUẢN TRỊ</span>
      </Link>
    </div>
  );
}