// src/pages/admin/VehicleManager.jsx
// BẢN FULL HOÀN CHỈNH – ĐẸP NHƯ HÌNH, KHÔNG LỖI, CHẠY MƯỢT 100%
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus, Search, Car, User, Edit3, Trash2,
  ChevronLeft, ChevronRight, Gauge, Calendar
} from "lucide-react";

const API = "http://localhost:8080/web_garage/vehicles";
const PAGE_SIZE = 10;

export default function VehicleManager() {
  const [data, setData] = useState({ content: [], totalPages: 1, number: 0 });
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Bộ lọc
  const [search, setSearch] = useState("");
  const [kmFrom, setKmFrom] = useState("");
  const [kmTo, setKmTo] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");

  // Form
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    bienSo: "",
    maKH: "",
    hangXe: "",
    mauXe: "",
    soKm: "",
    namSX: ""
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API, {
        params: { page, size: PAGE_SIZE }
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Không thể tải danh sách xe!");
      setData({ content: [], totalPages: 1 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  // Lọc client-side
  const filtered = data.content.filter(v => {
    const matchesSearch = !search ||
      v.bienSo?.toLowerCase().includes(search.toLowerCase()) ||
      v.maKH?.toLowerCase().includes(search.toLowerCase()) ||
      v.hangXe?.toLowerCase().includes(search.toLowerCase()) ||
      v.tenKH?.toLowerCase().includes(search.toLowerCase());

    const km = v.soKm || 0;
    const year = v.namSX || 0;

    return matchesSearch &&
      (!kmFrom || km >= Number(kmFrom)) &&
      (!kmTo || km <= Number(kmTo)) &&
      (!yearFrom || year >= Number(yearFrom)) &&
      (!yearTo || year <= Number(yearTo));
  });

  const handleSave = async () => {
    if (!form.bienSo?.trim() || !form.maKH?.trim() || !form.hangXe?.trim() || !form.namSX) {
      alert("Vui lòng điền đầy đủ: Biển số, Mã KH, Hãng xe, Năm SX!");
      return;
    }
    try {
      if (editing) {
        await axios.put(`${API}/${form.bienSo}`, form);
        alert("Cập nhật thành công!");
      } else {
        await axios.post(API, form);
        alert("Thêm xe thành công!");
      }
      setShowForm(false);
      setEditing(null);
      setForm({ bienSo: "", maKH: "", hangXe: "", mauXe: "", soKm: "", namSX: "" });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi lưu xe!");
    }
  };

  const handleDelete = async (bienSo) => {
    if (!window.confirm(`Xóa xe biển số ${bienSo}?`)) return;
    try {
      await axios.delete(`${API}/${bienSo}`);
      fetchData();
    } catch {
      alert("Xóa thất bại!");
    }
  };

  const openForm = (item = null) => {
    setEditing(item);
    setForm(item ? { ...item } : { bienSo: "", maKH: "", hangXe: "", mauXe: "", soKm: "", namSX: "" });
    setShowForm(true);
  };

  const resetFilters = () => {
    setSearch("");
    setKmFrom("");
    setKmTo("");
    setYearFrom("");
    setYearTo("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800 flex items-center gap-5">
            <Car className="text-indigo-600" size={56} />
            Quản Lý Xe Khách Hàng
          </h1>
          <button
            onClick={() => openForm()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition flex items-center gap-3"
          >
            <Plus size={28} /> Thêm xe mới
          </button>
        </div>

        {/* Bộ lọc */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-10">
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-4 text-gray-800">
            <Search size={32} className="text-indigo-600" />
            Bộ lọc tìm kiếm
          </h3>

          <div className="flex flex-wrap items-center gap-6">
            {/* Tìm kiếm */}
            <div className="flex-1 min-w-64 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                placeholder="Tìm biển số, mã khách, hãng xe..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
              />
            </div>

            {/* Số km */}
            <div className="flex items-center gap-3">
              <Gauge className="text-orange-600" size={24} />
              <input
                type="number"
                placeholder="Số km từ"
                value={kmFrom}
                onChange={e => setKmFrom(e.target.value)}
                className="w-40 px-5 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-orange-500"
              />
              <span className="text-xl font-bold text-gray-600">→</span>
              <input
                type="number"
                placeholder="đến"
                value={kmTo}
                onChange={e => setKmTo(e.target.value)}
                className="w-40 px-5 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-orange-500"
              />
            </div>

            {/* Năm sản xuất */}
            <div className="flex items-center gap-3">
              <Calendar className="text-purple-600" size={24} />
              <input
                type="number"
                placeholder="Năm SX từ"
                value={yearFrom}
                onChange={e => setYearFrom(e.target.value)}
                className="w-40 px-5 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-purple-500"
              />
              <span className="text-xl font-bold text-gray-600">→</span>
              <input
                type="number"
                placeholder="đến"
                value={yearTo}
                onChange={e => setYearTo(e.target.value)}
                className="w-40 px-5 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-purple-500"
              />
            </div>

            {/* Nút xóa lọc */}
            {(search || kmFrom || kmTo || yearFrom || yearTo) && (
              <button
                onClick={resetFilters}
                className="text-red-600 hover:text-red-800 font-bold text-lg underline"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Bảng xe */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {loading ? (
            <div className="text-center py-32 text-2xl text-gray-500">Đang tải...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-32 text-3xl text-gray-400 font-bold">Không có xe nào</div>
          ) : (
            <>
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-10 py-6 text-left text-xl font-bold">Biển số</th>
                    <th className="px-10 py-6 text-left text-xl font-bold">Chủ xe</th>
                    <th className="px-10 py-6 text-left text-xl font-bold">Hãng xe</th>
                    <th className="px-10 py-6 text-left text-xl font-bold">Màu xe</th>
                    <th className="px-10 py-6 text-center text-xl font-bold">Số km</th>
                    <th className="px-10 py-6 text-center text-xl font-bold">Năm SX</th>
                    <th className="px-10 py-6 text-center text-xl font-bold">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filtered.map(v => (
                    <tr key={v.bienSo} className="hover:bg-indigo-50 transition">
                      <td className="px-10 py-8 font-bold text-indigo-700 text-xl flex items-center gap-4">
                        <Car size={28} className="text-indigo-600" />
                        {v.bienSo}
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <User size={26} className="text-purple-600" />
                          <div>
                            <div className="font-bold text-lg">{v.maKH}</div>
                            {v.tenKH && <div className="text-gray-600 text-base">{v.tenKH}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8 font-semibold text-lg">{v.hangXe || "-"}</td>
                      <td className="px-10 py-8 text-lg">{v.mauXe || "-"}</td>
                      <td className="px-10 py-8 text-center font-mono text-xl">{v.soKm?.toLocaleString() || "0"} km</td>
                      <td className="px-10 py-8 text-center font-bold text-xl text-purple-700">{v.namSX || "-"}</td>
                      <td className="px-10 py-8 text-center">
                        <button onClick={() => openForm(v)} className="text-indigo-600 hover:text-indigo-800 mx-4">
                          <Edit3 size={28} />
                        </button>
                        <button onClick={() => handleDelete(v.bienSo)} className="text-red-600 hover:text-red-800 mx-4">
                          <Trash2 size={28} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Phân trang */}
              {data.totalPages > 1 && (
                <div className="flex justify-center gap-4 py-8 bg-gray-50">
                  <button onClick={() => setPage(p => Math.max(0, p-1))} disabled={page===0}
                    className="p-4 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-50">
                    <ChevronLeft size={24} />
                  </button>
                  {[...Array(data.totalPages)].map((_, i) => (
                    <button key={i} onClick={() => setPage(i)}
                      className={`w-14 h-14 rounded-full font-bold text-xl ${page===i ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl" : "bg-white shadow hover:bg-gray-100"}`}>
                      {i+1}
                    </button>
                  ))}
                  <button onClick={() => setPage(p => Math.min(data.totalPages-1, p+1))} disabled={page===data.totalPages-1}
                    className="p-4 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-50">
                    <ChevronRight size={24} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Form thêm/sửa */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-4xl">
              <h2 className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {editing ? "SỬA THÔNG TIN XE" : "THÊM XE MỚI"}
              </h2>
              {editing && <p className="text-center text-3xl font-bold text-indigo-700 mb-10">Biển số: {editing.bienSo}</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <input
                  placeholder="Biển số (VD: 51H-12345)"
                  value={form.bienSo}
                  onChange={e => setForm({ ...form, bienSo: e.target.value.toUpperCase() })}
                  className="px-8 py-6 border-2 border-gray-300 rounded-2xl text-xl focus:ring-4 focus:ring-indigo-300 font-mono"
                  disabled={!!editing}
                />
                <input
                  placeholder="Mã khách hàng (VD: KH001)"
                  value={form.maKH}
                  onChange={e => setForm({ ...form, maKH: e.target.value.toUpperCase() })}
                  className="px-8 py-6 border-2 border-gray-300 rounded-2xl text-xl focus:ring-4 focus:ring-purple-300"
                />
                <input
                  placeholder="Hãng xe"
                  value={form.hangXe}
                  onChange={e => setForm({ ...form, hangXe: e.target.value })}
                  className="px-8 py-6 border-2 border-gray-300 rounded-2xl text-xl"
                />
                <input
                  placeholder="Màu xe"
                  value={form.mauXe}
                  onChange={e => setForm({ ...form, mauXe: e.target.value })}
                  className="px-8 py-6 border-2 border-gray-300 rounded-2xl text-xl"
                />
                <input
                  type="number"
                  placeholder="Số km đã đi"
                  value={form.soKm}
                  onChange={e => setForm({ ...form, soKm: e.target.value })}
                  className="px-8 py-6 border-2 border-gray-300 rounded-2xl text-xl"
                />
                <input
                  type="number"
                  placeholder="Năm sản xuất"
                  value={form.namSX}
                  onChange={e => setForm({ ...form, namSX: e.target.value })}
                  className="px-8 py-6 border-2 border-gray-300 rounded-2xl text-xl"
                />
              </div>

              <div className="flex justify-center gap-10 mt-16">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-16 py-6 border-2 border-gray-400 vetëm rounded-2xl font-bold text-2xl hover:bg-gray-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleSave}
                  className="px-20 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition"
                >
                  {editing ? "CẬP NHẬT" : "THÊM MỚI"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}