import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Star, Clock } from 'lucide-react';

const API = "http://localhost:8080/web_garage/parts";

export default function PartsSection({ onViewAllParts }) {
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchParts();
    }, []);

    const fetchParts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}?page=0&size=8`);
            const result = await res.json();
            setParts(result.content || []);
        } catch (err) {
            console.error("Lỗi tải phụ tùng:", err);
        } finally {
            setLoading(false);
        }
    };

    const getStockStatus = (soLuongTon) => {
        if (soLuongTon === 0) return {
            text: 'Hết hàng',
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200'
        };
        return {
            text: 'Còn hàng',
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200'
        };
    };

    const handleNavigate = () => {
        navigate("/parts");
    };

    return (
        <section id="parts" className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Phụ tùng nổi bật</h2>
                    <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="text-center py-16">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Đang tải phụ tùng...</p>
                    </div>
                ) : (
                    <>
                        {/* Grid phụ tùng */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {parts.slice(0, 8).map((part) => {
                                const stockStatus = getStockStatus(part.soLuongTon);
                                return (
                                    <div
                                        key={part.maPT}
                                        onClick={handleNavigate}
                                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer"
                                    >
                                        {/* Card Header */}
                                        <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden flex items-center justify-center">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 opacity-10 rounded-full -mr-16 -mt-16"></div>
                                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400 opacity-10 rounded-full -ml-12 -mb-12"></div>

                                            <div className="relative text-center z-10 p-4">
                                                <div className="flex justify-center mb-3">
                                                    <Package className="text-yellow-400" size={40} />
                                                </div>
                                                <h3 className="text-xl font-bold text-white line-clamp-2">
                                                    {part.tenPT}
                                                </h3>
                                            </div>

                                            <Star size={20} className="absolute top-3 right-3 text-yellow-400 fill-yellow-400" />
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-6">
                                            {/* Giá tiền */}
                                            <div className="mb-4 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                                                <div className="text-center">
                                                    <p className="text-sm text-gray-600 mb-1">Giá phụ tùng</p>
                                                    <p className="text-2xl font-black text-red-600">
                                                        {Number(part.donGia).toLocaleString()}đ
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Trạng thái hàng - Không hiển thị số lượng */}
                                            <div className={`mb-4 p-3 rounded-lg border-2 ${stockStatus.bgColor} ${stockStatus.borderColor}`}>
                                                <p className={`text-sm text-center font-bold ${stockStatus.color}`}>
                                                    {stockStatus.text}
                                                </p>
                                            </div>

                                            {/* Tính năng */}
                                            <div className="flex items-center justify-center gap-4 mb-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={16} className="text-yellow-600" />
                                                    <span>Giao nhanh</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star size={16} className="text-yellow-600" />
                                                    <span>Chính hãng</span>
                                                </div>
                                            </div>

                                            {/* Button */}
                                            <button
                                                className={`w-full font-bold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${
                                                    part.soLuongTon === 0
                                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                        : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                                                }`}
                                                disabled={part.soLuongTon === 0}
                                            >
                                                {part.soLuongTon === 0 ? 'Hết hàng' : 'Đặt mua ngay'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Nút xem tất cả */}
                        <div className="text-center">
                            <button
                                onClick={handleNavigate}
                                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg inline-flex items-center gap-2"
                            >
                                Xem tất cả phụ tùng
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}