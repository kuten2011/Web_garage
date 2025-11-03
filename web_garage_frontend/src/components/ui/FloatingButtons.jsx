import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingButtons() {
  return (
    <div className="fixed right-4 bottom-4 flex flex-col gap-3 z-50">
      <a href="tel:0917461737"
        className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition animate-pulse">
        <Phone size={24} />
      </a>
      <a href="#"
        className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition">
        <MessageCircle size={24} />
      </a>
    </div>
  );
}