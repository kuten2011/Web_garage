// src/pages/admin/FeedbackManager.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance"; 
import { Search, MessageSquare, User, Clock, CheckCircle, AlertCircle, Edit3, ChevronLeft, ChevronRight } from "lucide-react";

const API = "http://localhost:8080/admin/feedbacks";
const PAGE_SIZE = 10;

export default function FeedbackManager() {
  const [data, setData] = useState({ content: [], totalPages: 1 });
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [responseText, setResponseText] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = { page, size: PAGE_SIZE };
      if (search.trim()) params.search = search.trim();
      if (filterStatus) params.trangThai = filterStatus;

      const res = await axiosInstance.get(API, { params });
      setData(res.data);
    } catch (err) {
      alert("Lỗi tải danh sách phản hồi!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search, filterStatus]);

  const openResponseForm = (feedback) => {
    setCurrentFeedback(feedback);
    setResponseText(feedback.phanHoiQL || "");
    setShowForm(true);
  };

  const handleSaveResponse = async () => {
    if (!responseText.trim()) {
      alert("Vui lòng nhập nội dung phản hồi!");
      return;
    }
    try {
      const dto = {
        ...currentFeedback,
        trangThai: "Đã phản hồi",
        phanHoiQL: responseText.trim()
      };
      await axiosInstance.patch(`${API}/${currentFeedback.maPhanHoi}`, dto);
      alert("Phản hồi khách hàng thành công!");
      setShowForm(false);
      setCurrentFeedback(null);
      setResponseText("");
      fetchData();
    } catch (err) {
      alert("Lỗi khi gửi phản hồi!");
    }
  };

  const getStatusColor = (status) => {
    return status === "Đã phản hồi" ? "bg-green-100 text-green-800" :
           status === "Đang xử lý" ? "bg-yellow-100 text-yellow-800" :
           "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-800 flex items-center gap-5">
            <MessageSquare className="text-indigo-600" size={56} />
            Quản Lý Phản Hồi Khách Hàng
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-10">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={26} />
              <input
                placeholder="Tìm mã phản hồi, khách hàng, nội dung..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
              />
            </div>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-8 py-5 border-2 border-gray-300 rounded-2xl text-lg font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="Chưa xử lý">Chưa xử lý</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Đã phản hồi">Đã phản hồi</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {loading ? (
            <div className="text-center py-32 text-2xl text-gray-500">Đang tải phản hồi...</div>
          ) : data.content.length === 0 ? (
            <div className="text-center py-32 text-3xl text-gray-400 font-bold">Chưa có phản hồi nào</div>
          ) : (
            <>
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-10 py-6 text-left text-xl font-bold">Mã PH</th>
                    <th className="px-10 py-6 text-left text-xl font-bold">Khách hàng</th>
                    <th className="px-10 py-6 text-left text-xl font-bold">Nội dung</th>
                    <th className="px-10 py-6 text-center text-xl font-bold">Ngày gửi</th>
                    <th className="px-10 py-6 text-center text-xl font-bold">Trạng thái</th>
                    <th className="px-10 py-6 text-center text-xl font-bold">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.content.map(f => (
                    <tr key={f.maPhanHoi} className="hover:bg-indigo-50 transition">
                      <td className="px-10 py-8 font-bold text-indigo-700 text-xl">{f.maPhanHoi}</td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-3">
                          <User size={22} className="text-gray-600" />
                          <div>
                            <div className="font-bold">{f.maKH || "-"}</div>
                            {f.khachHang?.hoTen || "-" && <div className="text-sm text-gray-600">{f.khachHang?.sdt || "-"}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-gray-700 max-w-md">
                        <p className="line-clamp-3">{f.noiDung}</p>
                      </td>
                      <td className="px-10 py-8 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Clock size={20} className="text-gray-500" />
                          <span>{new Date(f.ngayGui).toLocaleString("vi-VN")}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-center">
                        <span className={`px-6 py-3 rounded-full text-lg font-bold ${getStatusColor(f.trangThai)}`}>
                          {f.trangThai}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-center">
                        <button
                          onClick={() => openResponseForm(f)}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition flex items-center gap-3 mx-auto"
                        >
                          <Edit3 size={24} />
                          Xử lý phản hồi
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {data.totalPages > 1 && (
                <div className="flex justify-center gap-4 py-8 bg-gray-50">
                  <button onClick={() => setPage(p => Math.max(0, p-1))} disabled={page===0} className="p-4 rounded-full bg-white shadow disabled:opacity-50"><ChevronLeft size={24} /></button>
                  {[...Array(data.totalPages)].map((_, i) => (
                    <button key={i} onClick={() => setPage(i)} className={`w-14 h-14 rounded-full font-bold text-xl ${page===i ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl" : "bg-white shadow hover:bg-gray-100"}`}>
                      {i+1}
                    </button>
                  ))}
                  <button onClick={() => setPage(p => Math.min(data.totalPages-1, p+1))} disabled={page===data.totalPages-1} className="p-4 rounded-full bg-white shadow disabled:opacity-50"><ChevronRight size={24} /></button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal xử lý phản hồi */}
        {showForm && currentFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-4xl">
              <h2 className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                XỬ LÝ PHẢN HỒI
              </h2>

              <div className="space-y-8">
                <div className="bg-gray-100 p-8 rounded-3xl">
                  <div className="flex items-center gap-4 mb-4">
                    <User size={32} className="text-indigo-600" />
                    <div>
                      <div className="text-2xl font-bold">{currentFeedback.maKH}</div>
                      <div className="text-gray-600">Ngày gửi: {new Date(currentFeedback.ngayGui).toLocaleString("vi-VN")}</div>
                    </div>
                  </div>
                  <p className="text-xl text-gray-800 mt-6">{currentFeedback.noiDung}</p>
                </div>

                <div>
                  <label className="text-2xl font-bold text-gray-800 mb-4 block">Phản hồi của quản lý</label>
                  <textarea
                    value={responseText}
                    onChange={e => setResponseText(e.target.value)}
                    rows="8"
                    placeholder="Nhập nội dung phản hồi cho khách hàng..."
                    className="w-full px-8 py-6 border-2 border-gray-300 rounded-2xl text-xl focus:ring-4 focus:ring-indigo-300 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-center gap-10 mt-16">
                <button onClick={() => setShowForm(false)} className="px-16 py-6 border-2 border-gray-400 rounded-2xl font-bold text-2xl hover:bg-gray-100 transition">
                  Hủy bỏ
                </button>
                <button onClick={handleSaveResponse} className="px-20 py-6 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition">
                  Gửi phản hồi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}