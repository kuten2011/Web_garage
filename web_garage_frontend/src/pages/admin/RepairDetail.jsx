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
  CalendarDays
} from "lucide-react";

const API_BASE = "http://localhost:8080/web_garage";
const REPAIR_API = `${API_BASE}/repairs`;
const REPAIR_PART_API = `${API_BASE}/repair-parts/phieu`;

export default function RepairDetail() {
  const { maPhieu } = useParams();
  const [repair, setRepair] = useState(null);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddPart, setShowAddPart] = useState(false);
  const [newPart, setNewPart] = useState({ maPT: "", soLuong: 1 });

  const fetchData = async () => {
    try {
      const [repairRes, partsRes] = await Promise.all([
        axios.get(`${REPAIR_API}/${maPhieu}`),
        axios.get(`${REPAIR_PART_API}/${maPhieu}`)
      ]);
      setRepair(repairRes.data);
      setParts(partsRes.data);
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
    if (!newPart.maPT.trim()) {
      alert("Vui lòng nhập mã phụ tùng!");
      return;
    }

    try {
      await axios.post(`${REPAIR_PART_API}/${maPhieu}`, {
        maPT: newPart.maPT.toUpperCase(),
        soLuong: newPart.soLuong
      });
      setShowAddPart(false);
      setNewPart({ maPT: "", soLuong: 1 });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Thêm phụ tùng thất bại!");
    }
  };

  const handleRemovePart = async (maPT) => {
    if (!window.confirm("Xóa phụ tùng này khỏi phiếu?")) return;

    try {
      await axios.delete(`${REPAIR_PART_API}/${maPhieu}/phutung/${maPT}`);
      fetchData();
    } catch (err) {
      alert("Xóa thất bại!");
    }
  };

  const getTotal = () =>
    parts.reduce((sum, p) => sum + (p.thanhTien || 0), 0);

  if (loading)
    return (
      <div className="text-center py-32 text-3xl text-gray-600">
        Đang tải chi tiết phiếu...
      </div>
    );

  if (!repair)
    return (
      <div className="text-center py-32 text-3xl text-red-600">
        Không tìm thấy phiếu sửa chữa!
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <Link
          to="/admin/repairs"
          className="inline-flex items-center gap-3 text-indigo-600 hover:text-indigo-800 font-bold text-xl mb-8"
        >
          <ArrowLeft size={28} /> Quay lại danh sách
        </Link>

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-10">
          <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">
            PHIẾU SỬA CHỮA:{" "}
            <span className="text-indigo-600">{repair.maPhieu}</span>
          </h1>

          {/* Parts list */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-8">
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
                Chưa có phụ tùng nào được thêm vào phiếu
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <tr>
                      <th className="px-8 py-5 text-left text-xl font-bold">Mã PT</th>
                      <th className="px-8 py-5 text-left text-xl font-bold">Tên phụ tùng</th>
                      <th className="px-8 py-5 text-center text-xl font-bold">Số lượng</th>
                      <th className="px-8 py-5 text-right text-xl font-bold">Đơn giá</th>
                      <th className="px-8 py-5 text-right text-xl font-bold">Thành tiền</th>
                      <th className="px-8 py-5 text-center text-xl font-bold">Xóa</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {parts.map((p) => (
                      <tr key={p.maPT} className="hover:bg-purple-50 transition">
                        <td className="px-8 py-6 font-bold text-indigo-700 text-lg">{p.maPT}</td>
                        <td className="px-8 py-6 text-lg">{p.tenPT || "-"}</td>
                        <td className="px-8 py-6 text-center font-bold text-xl">{p.soLuong}</td>
                        <td className="px-8 py-6 text-right font-mono text-lg">
                          {p.donGia?.toLocaleString() || "0"}đ
                        </td>
                        <td className="px-8 py-6 text-right font-bold text-2xl text-purple-700">
                          {p.thanhTien?.toLocaleString() || "0"}đ
                        </td>
                        <td className="px-8 py-6 text-center">
                          <button
                            onClick={() => handleRemovePart(p.maPT)}
                            className="text-red-600 hover:text-red-800 transition"
                          >
                            <Trash2 size={26} />
                          </button>
                        </td>
                      </tr>
                    ))}

                    <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 font-bold text-xl">
                      <td colSpan="4" className="px-8 py-6 text-right">
                        TỔNG TIỀN PHỤ TÙNG:
                      </td>
                      <td className="px-8 py-6 text-right text-3xl text-indigo-700">
                        {getTotal().toLocaleString()}đ
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Modal add part */}
        {showAddPart && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-2xl">
              <h2 className="text-5xl font-bold text-center mb-12 text-purple-600">
                Thêm Phụ Tùng Vào Phiếu
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-xl font-bold text-gray-700 mb-3">
                    Mã phụ tùng
                  </label>
                  <input
                    type="text"
                    placeholder="VD: PT001"
                    value={newPart.maPT}
                    onChange={(e) =>
                      setNewPart({
                        ...newPart,
                        maPT: e.target.value.toUpperCase()
                      })
                    }
                    className="w-full px-6 py-5 border-2 border-gray-300 rounded-2xl text-xl focus:ring-4 focus:ring-purple-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xl font-bold text-gray-700 mb-3">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newPart.soLuong}
                    onChange={(e) =>
                      setNewPart({
                        ...newPart,
                        soLuong: Number(e.target.value) || 1
                      })
                    }
                    className="w-full px-6 py-5 border-2 border-gray-300 rounded-2xl text-xl focus:ring-4 focus:ring-purple-300"
                  />
                </div>
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
      </div>
    </div>
  );
}