import { useState } from 'react';

export default function ContactSection() {
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', contactForm);
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
    setContactForm({ name: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-yellow-400">Liên hệ & Đặt lịch hẹn</h2>
        <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

        <div className="max-w-lg mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Họ tên"
              value={contactForm.name}
              onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-700 text-white focus:border-yellow-400 focus:outline-none"
              required
            />
            <input
              type="tel"
              placeholder="Số điện thoại"
              value={contactForm.phone}
              onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-700 text-white focus:border-yellow-400 focus:outline-none"
              required
            />
            <textarea
              rows="4"
              placeholder="Nội dung cần tư vấn..."
              value={contactForm.message}
              onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-700 text-white focus:border-yellow-400 focus:outline-none"
            />
            <button type="submit" className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg hover:bg-yellow-500 transition">
              Gửi yêu cầu
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}