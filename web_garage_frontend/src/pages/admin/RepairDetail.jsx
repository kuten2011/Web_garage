import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
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
  CreditCard,
  QrCode,
  CheckCircle,
} from "lucide-react";

const API_BASE = "http://localhost:8080/admin";
const REPAIR_API = `${API_BASE}/repairs`;
const REPAIR_PART_API = `${API_BASE}/repair-parts/phieu`;
const REPAIR_SERVICE_API = `${API_BASE}/repair-services/phieu`;

export default function RepairDetail() {
  const { maPhieu } = useParams();
  const [repair, setRepair] = useState(null);
  const [parts, setParts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  // Modal thêm phụ tùng
  const [showAddPart, setShowAddPart] = useState(false);
  const [newPart, setNewPart] = useState({ maPT: "", soLuong: 1 });

  // Modal thêm dịch vụ
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ maDV: "", soLuong: 1 });

  // Thanh toán
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null); // 'cash' | 'transfer'
  const [qrCode, setQrCode] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [repairRes, partsRes, servicesRes] = await Promise.all([
        axiosInstance.get(`${REPAIR_API}/${maPhieu}`),
        axiosInstance.get(`${REPAIR_PART_API}/${maPhieu}`),
        axiosInstance.get(`${REPAIR_SERVICE_API}/${maPhieu}`),
      ]);

      setRepair(repairRes.data);
      setParts(partsRes.data || []);
      setServices(servicesRes.data || []);

      // Tính tổng tiền
      const totalParts = (partsRes.data || []).reduce((sum, item) => sum + (item.thanhTien || 0), 0);
      const totalServices = (servicesRes.data || []).reduce((sum, item) => sum + (item.thanhTien || 0), 0);
      setTotalAmount(totalParts + totalServices);
    } catch (err) {
      console.error("Lỗi tải dữ liệu:", err);
      alert("Không thể tải chi tiết phiếu sửa chữa!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [maPhieu]);

  // Thêm phụ tùng
  const handleAddPart = async () => {
    if (!newPart.maPT.trim()) return alert("Vui lòng nhập mã phụ tùng!");
    try {
      await axiosInstance.post(`${REPAIR_PART_API}/${maPhieu}`, newPart);
      alert("Thêm phụ tùng thành công!");
      setShowAddPart(false);
      setNewPart({ maPT: "", soLuong: 1 });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Thêm phụ tùng thất bại!");
    }
  };

  // Xóa phụ tùng
  const handleRemovePart = async (maPT) => {
    if (!window.confirm("Xóa phụ tùng này khỏi phiếu?")) return;
    try {
      await axiosInstance.delete(`${REPAIR_PART_API}/${maPhieu}/phutung/${maPT}`);
      fetchData();
    } catch (err) {
      alert("Xóa thất bại!");
    }
  };

  // Thêm dịch vụ
  const handleAddService = async () => {
    if (!newService.maDV.trim()) return alert("Vui lòng nhập mã dịch vụ!");
    try {
      await axiosInstance.post(`${REPAIR_SERVICE_API}/${maPhieu}`, newService);
      alert("Thêm dịch vụ thành công!");
      setShowAddService(false);
      setNewService({ maDV: "", soLuong: 1 });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Thêm dịch vụ thất bại!");
    }
  };

  // Xóa dịch vụ
  const handleRemoveService = async (maDV) => {
    if (!window.confirm("Xóa dịch vụ này khỏi phiếu?")) return;
    try {
      await axiosInstance.delete(`${REPAIR_SERVICE_API}/${maPhieu}/dichvu/${maDV}`);
      fetchData();
    } catch (err) {
      alert("Xóa thất bại!");
    }
  };

  // Thanh toán tiền mặt
  const handlePayCash = async () => {
    try {
      await axiosInstance.post(`${API_BASE}/repairs/${maPhieu}/pay-cash`);
      alert("Thanh toán tiền mặt thành công!");
      fetchData();
      setShowPaymentModal(false);
    } catch (err) {
      alert("Lỗi thanh toán tiền mặt!");
    }
  };

  // Lấy QR chuyển khoản
  const handleGetQR = async () => {
    try {
      const res = await axiosInstance.get(`${API_BASE}/repairs/${maPhieu}/qr`);
      setQrCode(res.data.qrCode);
      setPaymentMethod("transfer");
    } catch (err) {
      alert("Lỗi tạo mã QR!");
    }
  };

  // Xác nhận thủ công (admin)
  const handleConfirmPayment = async () => {
    if (!window.confirm("Xác nhận đã nhận tiền chuyển khoản cho phiếu này?")) return;
    try {
      await axiosInstance.post(`${API_BASE}/repairs/${maPhieu}/confirm-payment`);
      alert("Xác nhận thành công!");
      fetchData();
      setQrCode(null);
      setPaymentMethod(null);
    } catch (err) {
      alert("Lỗi xác nhận!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-3xl text-gray-600">Đang tải chi tiết phiếu...</div>
      </div>
    );
  }

  if (!repair) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-3xl text-red-600">Không tìm thấy phiếu sửa chữa!</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <Link
          to="/admin/repairs"
          className="inline-flex items-center gap-3 text-indigo-600 hover:text-indigo-800 font-bold text-xl mb-8"
        >
          <ArrowLeft size={28} />
          Quay lại danh sách
        </Link>

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-10 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            PHIẾU SỬA CHỮA: <span className="text-indigo-600">{maPhieu}</span>
          </h1>
          <p className="text-xl text-gray-600">
            Ngày lập: {repair.ngayLap ? new Date(repair.ngayLap).toLocaleDateString("vi-VN") : "-"}
          </p>
        </div>

        {/* Thông tin khách + xe + trạng thái */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl text-center">
            <User size={56} className="text-blue-600 mx-auto mb-4" />
            <div className="text-2xl font-bold">{repair.khachHang?.hoTen || "Chưa có"}</div>
            <div className="text-gray-600 mt-2">
              {repair.khachHang?.sdt || "-"} | {repair.khachHang?.email || "-"}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-3xl text-center">
            <Car size={56} className="text-purple-600 mx-auto mb-4" />
            <div className="text-2xl font-bold">{repair.xe?.bienSo || "Chưa có"}</div>
            <div className="text-gray-600 mt-2">
              {repair.xe ? `${repair.xe.hangXe} - ${repair.xe.mauXe}` : "-"}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl text-center">
            <Wrench size={56} className="text-green-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-green-700">{repair.trangThai || "-"}</div>
            <div className="text-gray-600 mt-2">Trạng thái phiếu</div>
          </div>
        </div>

        {/* Phụ tùng */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold flex items-center gap-4">
              <Package size={40} className="text-purple-600" />
              Phụ tùng sử dụng
            </h2>
            <button
              onClick={() => setShowAddPart(true)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition flex items-center gap-3"
            >
              <Plus size={28} />
              Thêm phụ tùng
            </button>
          </div>

          {parts.length === 0 ? (
            <div className="bg-gray-100 rounded-3xl p-16 text-center text-2xl text-gray-500">
              Chưa có phụ tùng nào
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <tr>
                    <th className="px-8 py-5 text-left">Mã PT</th>
                    <th className="px-8 py-5 text-left">Tên phụ tùng</th>
                    <th className="px-8 py-5 text-center">SL</th>
                    <th className="px-8 py-5 text-right">Đơn giá</th>
                    <th className="px-8 py-5 text-right">Thành tiền</th>
                    <th className="px-8 py-5 text-center">Xóa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {parts.map((p) => (
                    <tr key={p.maPT} className="hover:bg-purple-50">
                      <td className="px-8 py-6 font-bold text-indigo-700">{p.maPT}</td>
                      <td className="px-8 py-6">{p.tenPT || "-"}</td>
                      <td className="px-8 py-6 text-center font-bold">{p.soLuong}</td>
                      <td className="px-8 py-6 text-right">{(p.donGia || 0).toLocaleString()}đ</td>
                      <td className="px-8 py-6 text-right font-bold text-purple-700 text-xl">
                        {(p.thanhTien || 0).toLocaleString()}đ
                      </td>
                      <td className="px-8 py-6 text-center">
                        <button onClick={() => handleRemovePart(p.maPT)} className="text-red-600 hover:text-red-800">
                          <Trash2 size={24} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-purple-100 font-bold text-xl">
                    <td colSpan="4" className="px-8 py-6 text-right">TỔNG PHỤ TÙNG:</td>
                    <td className="px-8 py-6 text-right text-2xl text-purple-700">
                      {parts.reduce((sum, p) => sum + (p.thanhTien || 0), 0).toLocaleString()}đ
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Dịch vụ */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold flex items-center gap-4">
              <Wrench size={40} className="text-indigo-600" />
              Dịch vụ thực hiện
            </h2>
            <button
              onClick={() => setShowAddService(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition flex items-center gap-3"
            >
              <Plus size={28} />
              Thêm dịch vụ
            </button>
          </div>

          {services.length === 0 ? (
            <div className="bg-gray-100 rounded-3xl p-16 text-center text-2xl text-gray-500">
              Chưa có dịch vụ nào
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-8 py-5 text-left">Mã DV</th>
                    <th className="px-8 py-5 text-left">Tên dịch vụ</th>
                    <th className="px-8 py-5 text-center">SL</th>
                    <th className="px-8 py-5 text-right">Giá</th>
                    <th className="px-8 py-5 text-right">Thành tiền</th>
                    <th className="px-8 py-5 text-center">Xóa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {services.map((s) => (
                    <tr key={s.maDV} className="hover:bg-indigo-50">
                      <td className="px-8 py-6 font-bold text-indigo-700">{s.maDV}</td>
                      <td className="px-8 py-6">{s.tenDV || "-"}</td>
                      <td className="px-8 py-6 text-center font-bold">{s.soLuong}</td>
                      <td className="px-8 py-6 text-right">{(s.giaTien || 0).toLocaleString()}đ</td>
                      <td className="px-8 py-6 text-right font-bold text-indigo-700 text-xl">
                        {(s.thanhTien || 0).toLocaleString()}đ
                      </td>
                      <td className="px-8 py-6 text-center">
                        <button onClick={() => handleRemoveService(s.maDV)} className="text-red-600 hover:text-red-800">
                          <Trash2 size={24} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-indigo-100 font-bold text-xl">
                    <td colSpan="4" className="px-8 py-6 text-right">TỔNG DỊCH VỤ:</td>
                    <td className="px-8 py-6 text-right text-2xl text-indigo-700">
                      {services.reduce((sum, s) => sum + (s.thanhTien || 0), 0).toLocaleString()}đ
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* HÓA ĐƠN & THANH TOÁN */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-12">
          <h2 className="text-4xl font-bold text-center mb-10 flex items-center justify-center gap-4">
            <DollarSign size={48} className="text-green-600" />
            HÓA ĐƠN THANH TOÁN
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-2xl">
              <p>Tổng phụ tùng: <span className="font-bold">{parts.reduce((sum, p) => sum + (p.thanhTien || 0), 0).toLocaleString()} đ</span></p>
              <p>Tổng dịch vụ: <span className="font-bold">{services.reduce((sum, s) => sum + (s.thanhTien || 0), 0).toLocaleString()} đ</span></p>
              <p className="text-4xl font-bold text-green-600 border-t-4 border-green-600 pt-4">
                TỔNG CỘNG: {totalAmount.toLocaleString()} đ
              </p>
            </div>

            <div className="text-center space-y-6">
              <p className="text-2xl">
                Trạng thái thanh toán:{" "}
                <span className={`inline-block px-6 py-3 rounded-full font-bold text-xl ${
                  repair.thanhToanStatus === "Đã thanh toán"
                    ? "bg-green-100 text-green-800"
                    : repair.thanhToanStatus === "Chờ chuyển khoản"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {repair.thanhToanStatus || "Chưa thanh toán"}
                </span>
              </p>

              {/* Nút thanh toán nếu chưa thanh toán */}
              {repair.thanhToanStatus !== "Đã thanh toán" && (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="px-16 py-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition flex items-center gap-4 mx-auto"
                >
                  <CreditCard size={36} />
                  Thanh toán ngay
                </button>
              )}

              {/* Nút xác nhận thủ công nếu đang chờ chuyển khoản */}
              {repair.thanhToanStatus === "Chờ chuyển khoản" && (
                <button
                  onClick={handleConfirmPayment}
                  className="px-12 py-5 bg-orange-500 text-white rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition flex items-center gap-3 mx-auto"
                >
                  <CheckCircle size={32} />
                  Xác nhận đã nhận tiền
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modal chọn phương thức thanh toán */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-lg">
              <h3 className="text-4xl font-bold text-center mb-12">Chọn phương thức thanh toán</h3>
              <div className="space-y-8">
                <button
                  onClick={handlePayCash}
                  className="w-full py-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-2xl hover:shadow-2xl transition"
                >
                  💵 Tiền mặt
                </button>
                <button
                  onClick={handleGetQR}
                  className="w-full py-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold text-2xl hover:shadow-2xl transition flex items-center justify-center gap-4"
                >
                  <QrCode size={40} />
                  Chuyển khoản (QR Code)
                </button>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full mt-10 text-gray-600 font-bold text-xl hover:underline"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        )}

        {/* Hiển thị QR chuyển khoản */}
        {paymentMethod === "transfer" && qrCode && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-lg">
              <h3 className="text-4xl font-bold mb-10">Quét QR để chuyển khoản</h3>
              <img src={qrCode} alt="QR Thanh toán" className="mx-auto mb-10 w-96 h-96" />
              <p className="text-2xl font-bold mb-4">Số tiền: {totalAmount.toLocaleString()} đ</p>
              <p className="text-xl text-gray-700 mb-10">
                Vui lòng ghi nội dung chuyển khoản: <span className="font-bold text-indigo-600">{maPhieu}</span>
              </p>
              <button
                onClick={() => {
                  setPaymentMethod(null);
                  setQrCode(null);
                }}
                className="px-16 py-6 bg-gray-300 rounded-2xl font-bold text-xl hover:bg-gray-400 transition"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {/* Modal thêm phụ tùng */}
        {showAddPart && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-2xl">
              <h2 className="text-5xl font-bold text-center mb-12 text-purple-600">Thêm Phụ Tùng</h2>
              <div className="grid grid-cols-2 gap-10">
                <input
                  placeholder="Mã phụ tùng (VD: PT001)"
                  value={newPart.maPT}
                  onChange={(e) => setNewPart({ ...newPart, maPT: e.target.value.toUpperCase() })}
                  className="px-8 py-6 border-2 border-gray-300 rounded-2xl text-xl focus:ring-4 focus:ring-purple-300 font-mono"
                />
                <input
                  type="number"
                  placeholder="Số lượng"
                  min="1"
                  value={newPart.soLuong}
                  onChange={(e) => setNewPart({ ...newPart, soLuong: Number(e.target.value) || 1 })}
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

        {/* Modal thêm dịch vụ */}
        {showAddService && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-2xl">
              <h2 className="text-5xl font-bold text-center mb-12 text-indigo-600">Thêm Dịch Vụ</h2>
              <div className="grid grid-cols-2 gap-10">
                <input
                  placeholder="Mã dịch vụ (VD: DV001)"
                  value={newService.maDV}
                  onChange={(e) => setNewService({ ...newService, maDV: e.target.value.toUpperCase() })}
                  className="px-8 py-6 border-2 border-gray-300 rounded-2xl text-xl focus:ring-4 focus:ring-indigo-300 font-mono"
                />
                <input
                  type="number"
                  placeholder="Số lượng"
                  min="1"
                  value={newService.soLuong}
                  onChange={(e) => setNewService({ ...newService, soLuong: Number(e.target.value) || 1 })}
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