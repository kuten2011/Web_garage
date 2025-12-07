// src/pages/admin/ReportManager.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TrendingUp, DollarSign, Car, Wrench, Calendar, Building } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const API = "http://localhost:8080/web_garage/reports";

export default function ReportManager() {
  const [summary, setSummary] = useState({ totalBranches: 0, totalRevenue: 0, totalCars: 0 });
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, monthlyRes] = await Promise.all([
          axios.get(`${API}/summary`),
          axios.get(`${API}/last12months`)
        ]);
        setSummary(summaryRes.data);
        setMonthlyData(monthlyRes.data.map(item => ({
          month: item.thangNam,
          revenue: item.doanhThu || 0,
          cars: item.soXePhucVu || 0
        })));
      } catch (err) {
        alert("Lỗi tải báo cáo!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-800 flex items-center gap-5">
            <TrendingUp className="text-indigo-600" size={56} />
            Báo Cáo Doanh Thu & Hoạt Động
          </h1>
        </div>

        {/* Tổng hợp nhanh */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 font-bold text-xl">Tổng chi nhánh</p>
                <p className="text-5xl font-bold text-blue-800 mt-3">{summary.totalBranches}</p>
              </div>
              <Building size={64} className="text-blue-600 opacity-70" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 font-bold text-xl">Tổng doanh thu</p>
                <p className="text-5xl font-bold text-green-800 mt-3">
                  {formatCurrency(summary.totalRevenue)}
                </p>
              </div>
              <DollarSign size={64} className="text-green-600 opacity-70" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 font-bold text-xl">Số xe phục vụ</p>
                <p className="text-5xl font-bold text-purple-800 mt-3">{summary.totalCars}</p>
              </div>
              <Car size={64} className="text-purple-600 opacity-70" />
            </div>
          </div>
        </div>

        {/* Biểu đồ doanh thu 12 tháng */}
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-4">
            <Calendar size={40} className="text-indigo-600" />
            Doanh thu & Số xe phục vụ 12 tháng gần nhất
          </h2>

          {loading ? (
            <div className="h-96 flex items-center justify-center text-2xl text-gray-500">Đang tải biểu đồ...</div>
          ) : (
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: "#555" }}
                  tickFormatter={(value) => {
                    const [year, month] = value.split("-");
                    return `${month}/${year}`;
                  }}
                />
                <YAxis yAxisId="left" tick={{ fill: "#10b981" }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: "#8b5cf6" }} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === "revenue" ? formatCurrency(value) : value,
                    name === "revenue" ? "Doanh thu" : "Số xe"
                  ]}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={4}
                  dot={{ fill: "#10b981", r: 8 }}
                  name="Doanh thu"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="cars" 
                  stroke="#8b5cf6" 
                  strokeWidth={4}
                  dot={{ fill: "#8b5cf6", r: 8 }}
                  name="Số xe phục vụ"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}