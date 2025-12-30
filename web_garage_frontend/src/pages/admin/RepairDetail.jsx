// src/pages/admin/RepairDetail.jsx
// HOÀN CHỈNH TUYỆT ĐỐI – ĐỒNG BỘ REPAIR PART & REPAIR SERVICE
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Car,
  User,
  Wrench,
  Package,
  Plus,
  Trash2,
  CalendarDays,
  DollarSign,
} from "lucide-react";

const API_BASE = "http://localhost:8080/web_garage";
const REPAIR_API = `${API_BASE}/repairs`;
const REPAIR_PART_API = `${API_BASE}/repair-parts/phieu`;
const REPAIR_SERVICE_API = `${API_BASE}/repair-services/phieu`; // ĐỒNG BỘ VỚI BACKEND MỚI

export default function RepairDetail() {
  const { maPhieu } = useParams();
  const [repair, setRepair] = useState(null);
  const [parts, setParts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal thêm phụ tùng
  const [showAddPart, setShowAddPart] = useState(false);
  const [newPart, setNewPart] = useState({ maPT: "", soLuong: 1 });

  // Modal thêm dịch vụ
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ maDV: "", soLuong: 1 });

  const fetchData = async () => {
    try {
      const [repairRes, partsRes, servicesRes] = await Promise.all([
        axios.get(`${REPAIR_API}/${maPhieu}`),
        axios.get(`${REPAIR_PART_API}/${maPhieu}`),
        axios.get(`${REPAIR_SERVICE_API}/${maPhieu}`),
      ]);
      setRepair(repairRes.data);
      setParts(partsRes.data);
      setServices(servicesRes.data);
    } catch (err) {
      alert("Không thể tải chi tiết phiếu sửa chữa!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [maPhieu]);

  const handleAddPart = async () => {
    if (!newPart.maPT.trim()) return alert("Vui lòng nhập mã phụ tùng!");
    try {
      await axios.post(`${REPAIR_PART_API}/${maPhieu}`, newPart);
      setShowAddPart(false);
      setNewPart({ maPT: "", soLuong: 1 });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Thêm phụ tùng thất bại!");
    }
  };

  const handleRemovePart = async (maPT) => {
    if (!window.confirm("Xóa phụ tùng này?")) return;
    try {
      await axios.delete(`${REPAIR_PART_API}/${maPhieu}/phutung/${maPT}`);
      fetchData();
    } catch (err) {
      alert("Xóa thất bại!");
    }
  };

  const handleAddService = async () => {
    if (!newService.maDV.trim()) return alert("Vui lòng nhập mã dịch vụ!");
    try {
      await axios.post(`${REPAIR_SERVICE_API}/${maPhieu}`, newService);
      setShowAddService(false);
      setNewService({ maDV: "", soLuong: 1 });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Thêm dịch vụ thất bại!");
    }
  };

  const handleRemoveService = async (maDV) => {
    if (!window.confirm("Xóa dịch vụ này?")) return;
    try {
      await axios.delete(`${REPAIR_SERVICE_API}/${maPhieu}/dichvu/${maDV}`);
      fetchData();
    } catch (err) {
      alert("Xóa thất bại!");
    }
  };

  const getTotalParts = () =>
    parts.reduce((sum, p) => sum + (p.thanhTien || 0), 0);
  const getTotalServices = () =>
    services.reduce((sum, s) => sum + (s.thanhTien || 0), 0);
  const getGrandTotal = () => getTotalParts() + getTotalServices();

  if (loading)
    return (
      <div className="text-center py-32 text-3xl text-gray-600">
        Đang tải chi tiết...
      </div>
    );
  if (!repair)
    return (
      <div className="text-center py-32 text-3xl text-red-600">
        Không tìm thấy phiếu!
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/admin/repairs"
          className="flex items-center gap-3 text-indigo-600 hover:text-indigo-800 font-bold text-xl mb-8"
        >
          <ArrowLeft size={28} /> Quay lại danh sách
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-10">
          <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">
            PHIẾU SỬA CHỮA:{" "}
            <span className="text-indigo-600">{repair.maPhieu}</span>
          </h1>

          {/* Thông tin chính */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl text-center">
              <User size={56} className="text-blue-600 mx-auto mb-4" />
              <div className="text-2xl font-bold">
                {repair?.khachHang?.hoTen || "Chưa có khách hàng"}
              </div>
              <div className="text-gray-600 mt-2">
                {repair?.khachHang?.maKH || "-"} - {repair?.khachHang?.sdt || "-"}  
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-3xl text-center">
              <Car size={56} className="text-purple-600 mx-auto mb-4" />
              <div className="text-2xl font-bold">
                {repair?.xe?.bienSo || "Chưa có xe"}
              </div>
              <div className="text-gray-600 mt-2">
                {repair?.xe
                  ? `${repair.xe.hangXe} - ${repair.xe.mauXe}`
                  : "-"}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl text-center">
              <Wrench size={56} className="text-green-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-700 mb-3">
                {repair?.trangThai || "-"}
              </div>
              <div className="text-gray-600">
                Ngày lập:{" "}
                {repair?.ngayLap
                  ? new Date(repair.ngayLap).toLocaleDateString("vi-VN")
                  : "-"}
              </div>
            </div>
          </div>

          {/* PHỤ TÙNG */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-4xl font-bold flex items-center gap-4 text-gray-800">
                <Package size={40} className="text-purple-600" />
                Phụ tùng sử dụng
              </h2>
              <button
                onClick={() => setShowAddPart(true)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition flex items-center gap-3"
              >
                <Plus size={28} /> Thêm phụ tùng
              </button>
            </div>

            {parts.length === 0 ? (
              <div className="bg-gray-100 rounded-3xl p-16 text-center text-2xl text-gray-500 font-medium">
                Chưa có phụ tùng nào
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <tr>
                    <th className="px-8 py-5 text-left text-xl font-bold">
                      Mã PT
                    </th>
                    <th className="px-8 py-5 text-left text-xl font-bold">
                      Tên
                    </th>
                    <th className="px-8 py-5 text-center text-xl font-bold">
                      SL
                    </th>
                    <th className="px-8 py-5 text-right text-xl font-bold">
                      Đơn giá
                    </th>
                    <th className="px-8 py-5 text-right text-xl font-bold">
                      Thành tiền
                    </th>
                    <th className="px-8 py-5 text-center text-xl font-bold">
                      Xóa
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {parts.map((p) => (
                    <tr key={p.maPT} className="hover:bg-purple-50 transition">
                      <td className="px-8 py-6 font-bold text-indigo-700 text-lg">
                        {p.maPT}
                      </td>
                      <td className="px-8 py-6 text-lg">{p.tenPT || "-"}</td>
                      <td className="px-8 py-6 text-center font-bold text-xl">
                        {p.soLuong}
                      </td>
                      <td className="px-8 py-6 text-right font-mono text-lg">
                        {p.donGia?.toLocaleString() || "0"}đ
                      </td>
                      <td className="px-8 py-6 text-right font-bold text-2xl text-purple-700">
                        {p.thanhTien?.toLocaleString() || "0"}đ
                      </td>
                      <td className="px-8 py-6 text-center">
                        <button
                          onClick={() => handleRemovePart(p.maPT)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={26} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 font-bold text-xl">
                    <td colSpan="4" className="px-8 py-6 text-right">
                      TỔNG PHỤ TÙNG:
                    </td>
                    <td className="px-8 py-6 text-right text-3xl text-indigo-700">
                      {getTotalParts().toLocaleString()}đ
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          {/* DỊCH VỤ */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-4xl font-bold flex items-center gap-4 text-gray-800">
                <Wrench size={40} className="text-indigo-600" />
                Dịch vụ đã chọn
              </h2>
              <button
                onClick={() => setShowAddService(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition flex items-center gap-3"
              >
                <Plus size={28} /> Thêm dịch vụ
              </button>
            </div>

            {services.length === 0 ? (
              <div className="bg-gray-100 rounded-3xl p-16 text-center text-2xl text-gray-500 font-medium">
                Chưa có dịch vụ nào
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-8 py-5 text-left text-xl font-bold">
                      Mã DV
                    </th>
                    <th className="px-8 py-5 text-left text-xl font-bold">
                      Tên dịch vụ
                    </th>
                    <th className="px-8 py-5 text-center text-xl font-bold">
                      SL
                    </th>
                    <th className="px-8 py-5 text-right text-xl font-bold">
                      Giá
                    </th>
                    <th className="px-8 py-5 text-right text-xl font-bold">
                      Thành tiền
                    </th>
                    <th className="px-8 py-5 text-center text-xl font-bold">
                      Xóa
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {services.map((s) => (
                    <tr key={s.maDV} className="hover:bg-indigo-50 transition">
                      <td className="px-8 py-6 font-bold text-indigo-700 text-lg">
                        {s.maDV}
                      </td>
                      <td className="px-8 py-6 text-lg">{s.tenDV || "-"}</td>
                      <td className="px-8 py-6 text-center font-bold text-xl">
                        {s.soLuong}
                      </td>
                      <td className="px-8 py-6 text-right font-mono text-lg">
                        {s.giaTien?.toLocaleString() || "0"}đ
                      </td>
                      <td className="px-8 py-6 text-right font-bold text-2xl text-indigo-700">
                        {s.thanhTien?.toLocaleString() || "0"}đ
                      </td>
                      <td className="px-8 py-6 text-center">
                        <button
                          onClick={() => handleRemoveService(s.maDV)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={26} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 font-bold text-xl">
                    <td colSpan="4" className="px-8 py-6 text-right">
                      TỔNG DỊCH VỤ:
                    </td>
                    <td className="px-8 py-6 text-right text-3xl text-indigo-700">
                      {getTotalServices().toLocaleString()}đ
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          {/* TỔNG TIỀN */}
          <div className="mt-12 text-right">
            <h2 className="text-4xl font-bold text-gray-800">
              TỔNG TIỀN:{" "}
              <span className="text-green-600">
                {getGrandTotal().toLocaleString()}đ
              </span>
            </h2>
          </div>
        </div>

        {/* MODAL THÊM PHỤ TÙNG */}
        {showAddPart && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-2xl">
              <h2 className="text-5xl font-bold text-center mb-12 text-purple-600">
                Thêm Phụ Tùng
              </h2>
              <div className="grid grid-cols-2 gap-10">
                <input
                  placeholder="Mã phụ tùng (VD: PT001)"
                  value={newPart.maPT}
                  onChange={(e) =>
                    setNewPart({
                      ...newPart,
                      maPT: e.target.value.toUpperCase(),
                    })
                  }
                  className="px-8 py-6 border-2 border-gray-300 rounded-2xl text-xl focus:ring-4 focus:ring-purple-300 font-mono"
                />
                <input
                  type="number"
                  placeholder="Số lượng"
                  min="1"
                  value={newPart.soLuong}
                  onChange={(e) =>
                    setNewPart({
                      ...newPart,
                      soLuong: Number(e.target.value) || 1,
                    })
                  }
                  className="px-8 py-6 border-2 border-gray-300 rounded-2xl text-xl focus:ring-4 focus:ring-purple-300"
                />
              </div>
              <div className="flex justify-center gap-10 mt-16">
                <button
                  onClick={() => setShowAddPart(false)}
                  className="px-16 py-6 border-2 border-gray-400 rounded-2xl font-bold text-2xl hover:bg-gray-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleAddPart}
                  className="px-20 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition"
                >
                  Thêm vào phiếu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL THÊM DỊCH VỤ */}
        {showAddService && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-2xl">
              <h2 className="text-5xl font-bold text-center mb-12 text-indigo-600">
                Thêm Dịch Vụ
              </h2>
              <div className="grid grid-cols-2 gap-10">
                <input
                  placeholder="Mã dịch vụ (VD: DV001)"
                  value={newService.maDV}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      maDV: e.target.value.toUpperCase(),
                    })
                  }
                  className="px-8 py-6 border-2 border-gray-300 rounded-2xl text-xl focus:ring-4 focus:ring-indigo-300 font-mono"
                />
                <input
                  type="number"
                  placeholder="Số lượng"
                  min="1"
                  value={newService.soLuong}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      soLuong: Number(e.target.value) || 1,
                    })
                  }
                  className="px-8 py-6 border-2 border-gray-300 rounded-2xl text-xl focus:ring-4 focus:ring-indigo-300"
                />
              </div>
              <div className="flex justify-center gap-10 mt-16">
                <button
                  onClick={() => setShowAddService(false)}
                  className="px-16 py-6 border-2 border-gray-400 rounded-2xl font-bold text-2xl hover:bg-gray-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleAddService}
                  className="px-20 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition"
                >
                  Thêm vào phiếu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
