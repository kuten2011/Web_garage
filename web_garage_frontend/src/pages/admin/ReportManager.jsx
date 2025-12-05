import React from "react";
import { TrendingUp, DollarSign, Car, Wrench } from "lucide-react";

export default function ReportManager() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Báo Cáo Doanh Thu & Hoạt Động</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl p-8">
          <DollarSign className="w-12 h-12 mb-4" />
          <p className="text-lg opacity-90">Doanh thu tháng này</p>
          <p className="text-4xl font-bold mt-2">285.000.000 đ</p>
          <p className="mt-4 text-sm opacity-80">Tăng 18% so với tháng trước</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl shadow-xl p-8">
          <Car className="w-12 h-12 mb-4" />
          <p className="text-lg opacity-90">Số xe đã phục vụ</p>
          <p className="text-4xl font-bold mt-2">342 xe</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl shadow-xl p-8">
          <Wrench className="w-12 h-12 mb-4" />
          <p className="text-lg opacity-90">Dịch vụ phổ biến nhất</p>
          <p className="text-2xl font-bold mt-2">Thay nhớt + vệ sinh</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Biểu đồ doanh thu 12 tháng gần nhất</h2>
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
          [Biểu đồ sẽ được tích hợp bằng Chart.js hoặc Recharts sau]
        </div>
      </div>
    </div>
  );
}