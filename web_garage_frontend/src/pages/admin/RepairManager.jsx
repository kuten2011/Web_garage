import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Plus, Search, Wrench, CalendarDays, User, Edit3, Trash2,
  ChevronLeft, ChevronRight, ClipboardList
} from "lucide-react";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:8080/web_garage";
const API = `${API_BASE}/repairs`;
const PAGE_SIZE = 10;

export default function RepairManager() {
  const [data, setData] = useState({ content: [], totalPages: 0, number: 0 });
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    maLich: "", maNV: "", ngayLap: "", ghiChu: "", trangThai: "Đang sửa"
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, {
        params: { page, size: PAGE_SIZE, sort: "ngayLap,desc" }
      });
      setData(res.data);
    } catch (err) {
      alert("Lỗi tải dữ liệu phiếu sửa chữa!");
      setData({ content: [], totalPages: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const filteredData = useMemo(() => {
    let items = data.content || [];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      items = items.filter(item =>
        item.maPhieu?.toLowerCase().includes(term) ||
        item.maLich?.toLowerCase().includes(term) ||
        item.maNV?.toLowerCase().includes(term) ||
        item.tenNV?.toLowerCase().includes(term)
      );
    }

    if (filterStatus !== "Tất cả") {
      items = items.filter(item => item.trangThai === filterStatus);
    }

    return items;
  }, [data.content, searchTerm, filterStatus]);

  const updateStatus = async (maPhieu, newStatus) => {
    try {
      await axios.patch(`${API}/${maPhieu}/status`, { trangThai: newStatus });
      fetchData();
    } catch (err) {
      alert("Cập nhật trạng thái thất bại!");
    }
  };

  const handleDelete = async (maPhieu) => {
    if (!window.confirm("Xóa phiếu sửa chữa này?")) return;
    try {
      await axios.delete(`${API}/${maPhieu}`);
      fetchData();
    } catch (err) {
      alert("Xóa thất bại!");
    }
  };

  const openForm = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        maLich: item.maLich || "",
        maNV: item.maNV || "",
        ngayLap: item.ngayLap || "",
        ghiChu: item.ghiChu || "",
        trangThai: item.trangThai || "Đang sửa"
      });
    } else {
      setEditingItem(null);
      setFormData({
        maLich: "", maNV: "", ngayLap: "", ghiChu: "", trangThai: "Đang sửa"
      });
    }
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        await axios.put(`${API}/${editingItem.maPhieu}`, formData);
        alert("Cập nhật thành công!");
      } else {
        await axios.post(API, formData);
        alert("Thêm phiếu thành công! Mã phiếu đã được tạo tự động.");
      }
      setShowForm(false);
      fetchData();
    } catch (err) {
      alert("Lỗi: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-4">
            Quản Lý Phiếu Sửa Chữa
          </h1>
          <button
            onClick={() => openForm()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
          >
            <Plus size={22} /> Thêm phiếu mới
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tìm mã phiếu, mã lịch, mã NV..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-6 py-4 border border-gray-200 rounded-xl bg-white font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Tất cả">Tất cả trạng thái</option>
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đang sửa">Đang sửa</option>
              <option value="Hoàn thành">Hoàn thành</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-5 text-left font-semibold">Mã Phiếu</th>
                  <th className="px-6 py-5 text-left font-semibold">Mã Lịch</th>
                  <th className="px-6 py-5 text-left font-semibold">Nhân Viên</th>
                  <th className="px-6 py-5 text-center font-semibold">Ngày Lập</th>
                  <th className="px-6 py-5 text-left font-semibold">Ghi Chú</th>
                  <th className="px-6 py-5 text-center font-semibold">Trạng Thái</th>
                  <th className="px-6 py-5 text-center font-semibold">Xem</th>
                  <th className="px-6 py-5 text-center font-semibold">Thao Tác</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-16 text-gray-500 text-lg">
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-16 text-gray-400 text-xl font-medium">
                      Không có phiếu sửa chữa
                    </td>
                  </tr>
                ) : (
                  filteredData.map((r) => (
                    <tr key={r.maPhieu} className="hover:bg-indigo-50 transition">
                      <td className="px-6 py-5 font-bold text-indigo-700 text-lg">{r.maPhieu}</td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <ClipboardList size={18} className="text-gray-500" />
                          <span className="font-medium">
                            {r.maLich || <span className="text-gray-400 italic">Chưa có</span>}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        {r.maNV ? (
                          <div className="flex items-center gap-3">
                            <User size={20} className="text-indigo-600" />
                            <div>
                              <div className="font-semibold">{r.maNV}</div>
                              {r.tenNV && <div className="text-sm text-gray-600">{r.tenNV}</div>}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Chưa phân công</span>
                        )}
                      </td>

                      <td className="px-6 py-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <CalendarDays size={20} className="text-purple-600" />
                          <span className="font-medium">{r.ngayLap || "-"}</span>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-700 max-w-xs">{r.ghiChu || "-"}</td>

                      <td className="px-6 py-5 text-center">
                        <select
                          value={r.trangThai}
                          onChange={(e) => updateStatus(r.maPhieu, e.target.value)}
                          className={`px-5 py-2 rounded-full text-xs font-bold cursor-pointer transition ${
                            r.trangThai === "Hoàn thành"
                              ? "bg-green-100 text-green-800"
                              : r.trangThai === "Đang sửa"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          <option value="Chờ xác nhận">Chờ xác nhận</option>
                          <option value="Đang sửa">Đang sửa</option>
                          <option value="Hoàn thành">Hoàn thành</option>
                        </select>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <Link
                          to={`/admin/repairParts/${r.maPhieu}`}
                          className="text-indigo-600 hover:text-indigo-800 font-bold underline"
                        >
                          Xem chi tiết
                        </Link>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex justify-center gap-5">
                          <button
                            onClick={() => openForm(r)}
                            className="text-indigo-600 hover:text-indigo-800 transition"
                            title="Sửa"
                          >
                            <Edit3 size={21} />
                          </button>
                          <button
                            onClick={() => handleDelete(r.maPhieu)}
                            className="text-red-600 hover:text-red-800 transition"
                            title="Xóa"
                          >
                            <Trash2 size={21} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {data.totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 py-6 bg-gray-50">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-3 rounded-lg bg-white shadow hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {[...Array(data.totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`w-10 h-10 rounded-lg font-semibold transition ${
                      page === i
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : "bg-white hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage(p => Math.min(data.totalPages - 1, p + 1))}
                disabled={page === data.totalPages - 1}
                className="p-3 rounded-lg bg-white shadow hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {editingItem ? "SỬA PHIẾU SỬA CHỮA" : "THÊM PHIẾU SỬA CHỮA MỚI"}
              </h2>

              {editingItem && (
                <div className="text-center mb-6">
                  <span className="inline-block px-6 py-3 bg-indigo-100 text-indigo-800 rounded-xl font-bold text-lg">
                    Mã phiếu: {editingItem.maPhieu}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  placeholder="Mã lịch hẹn (VD: LH001)"
                  value={formData.maLich}
                  onChange={(e) => setFormData({ ...formData, maLich: e.target.value })}
                  className="px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-300 outline-none"
                />
                <input
                  placeholder="Mã nhân viên (VD: NV001)"
                  value={formData.maNV}
                  onChange={(e) => setFormData({ ...formData, maNV: e.target.value })}
                  className="px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 outline-none"
                />
                <input
                  type="date"
                  value={formData.ngayLap}
                  onChange={(e) => setFormData({ ...formData, ngayLap: e.target.value })}
                  className="px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-300"
                />
                <select
                  value={formData.trangThai}
                  onChange={(e) => setFormData({ ...formData, trangThai: e.target.value })}
                  className="px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 font-medium"
                >
                  <option value="Chờ xác nhận">Chờ xác nhận</option>
                  <option value="Đang sửa">Đang sửa</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                </select>
              </div>

              <textarea
                placeholder="Ghi chú (tùy chọn)"
                value={formData.ghiChu}
                onChange={(e) => setFormData({ ...formData, ghiChu: e.target.value })}
                rows="3"
                className="w-full mt-6 px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-300 outline-none resize-none"
              />

              <div className="flex justify-center gap-6 mt-8">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-10 py-4 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleSave}
                  className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition"
                >
                  {editingItem ? "CẬP NHẬT" : "THÊM MỚI"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
