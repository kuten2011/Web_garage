-- ===============================
-- THÊM DỮ LIỆU MẪU
-- ===============================

-- ===== BẢNG CHI NHÁNH =====
INSERT INTO "ChiNhanh" ("maChiNhanh", "tenChiNhanh", "diaChi", "sdt", "email") VALUES
('CN01', 'Chi nhánh Quận 1', '123 Nguyễn Huệ, Q1, TP.HCM', '0909123456', 'cnq1@garage.vn'),
('CN02', 'Chi nhánh Bình Thạnh', '45 Điện Biên Phủ, Q.BT, TP.HCM', '0909988776', 'cnbt@garage.vn');

-- ===== BẢNG KHÁCH HÀNG =====
INSERT INTO "KhachHang" ("maKH", "hoTen", "sdt", "email", "diaChi", "matKhau") VALUES
('KH01', 'Nguyễn Văn A', '0905123456', 'a.nguyen@gmail.com', 'Q1, TP.HCM', '123456'),
('KH02', 'Trần Thị B', '0906234567', 'b.tran@gmail.com', 'Q3, TP.HCM', 'abcdef'),
('KH03', 'Lê Hoàng C', '0907345678', 'c.le@gmail.com', 'Q7, TP.HCM', 'qwerty');

-- ===== BẢNG NHÂN VIÊN =====
INSERT INTO "NhanVien" ("maNV", "hoTen", "vaiTro", "sdt", "email", "matKhau", "maChiNhanh") VALUES
('NV01', 'Phạm Văn D', 'Kỹ thuật viên', '0908123123', 'd.pham@garage.vn', 'nv123', 'CN01'),
('NV02', 'Võ Thị E', 'Lễ tân', '0908456789', 'e.vo@garage.vn', 'nv456', 'CN01'),
('NV03', 'Ngô Minh F', 'Quản lý', '0909678456', 'f.ngo@garage.vn', 'nv789', 'CN02');

-- ===== BẢNG XE =====
INSERT INTO "Xe" ("bienSo", "maKH", "hangXe", "mauXe", "soKm", "namSX") VALUES
('59A-12345', 'KH01', 'Toyota', 'Trắng', 35000, 2019),
('51B-67890', 'KH02', 'Honda', 'Đen', 27000, 2020),
('50C-11223', 'KH03', 'Mazda', 'Đỏ', 15000, 2022);

-- ===== BẢNG LỊCH HẸN =====
INSERT INTO "LichHen" ("maLich", "maKH", "bienSo", "ngayHen", "gioHen", "trangThai") VALUES
('LH01', 'KH01', '59A-12345', '2025-10-20', '09:00', 'Chờ xác nhận'),
('LH02', 'KH02', '51B-67890', '2025-10-21', '10:30', 'Đã xác nhận'),
('LH03', 'KH03', '50C-11223', '2025-10-22', '08:00', 'Đã hoàn thành');

-- ===== BẢNG DỊCH VỤ =====
INSERT INTO "DichVu" ("maDV", "tenDV", "giaTien", "moTa") VALUES
('DV01', 'Thay dầu động cơ', 350000, 'Thay dầu định kỳ cho xe ô tô.'),
('DV02', 'Rửa xe', 100000, 'Rửa ngoài, hút bụi nội thất.'),
('DV03', 'Kiểm tra phanh', 200000, 'Kiểm tra và điều chỉnh hệ thống phanh.');

-- ===== BẢNG CT_LICH_DICHVU =====
INSERT INTO "CT_Lich_DichVu" ("maLich", "maDV", "soLuong", "ghiChu") VALUES
('LH01', 'DV01', 1, 'Dầu tổng hợp'),
('LH02', 'DV02', 1, 'Xe rất bẩn, cần rửa kỹ'),
('LH03', 'DV03', 1, 'Kiểm tra phanh trước');

-- ===== BẢNG PHỤ TÙNG =====
INSERT INTO "PhuTung" ("maPT", "tenPT", "donGia", "soLuongTon") VALUES
('PT01', 'Lọc dầu', 150000, 30),
('PT02', 'Má phanh', 250000, 20),
('PT03', 'Bugi', 100000, 50);

-- ===== BẢNG PHIẾU SỬA CHỮA =====
INSERT INTO "PhieuSuaChua" ("maPhieu", "maLich", "maNV", "ngayLap", "ghiChu", "trangThai") VALUES
('PSC01', 'LH03', 'NV01', '2025-10-22', 'Thay má phanh', 'Hoàn thành');

-- ===== BẢNG CT_SuaChua_PhuTung =====
INSERT INTO "CT_SuaChua_PhuTung" ("maPhieu", "maPT", "soLuong", "thanhTien") VALUES
('PSC01', 'PT02', 2, 500000);

-- ===== BẢNG PHẢN HỒI =====
INSERT INTO "PhanHoi" ("maPhanHoi", "maKH", "noiDung", "ngayGui", "trangThai", "maNVXL", "phanHoiQL") VALUES
('PH01', 'KH01', 'Thái độ phục vụ tốt.', '2025-10-23 09:30:00', 'Đã phản hồi', 'NV03', 'Cảm ơn góp ý của bạn!');

-- ===== BẢNG BÁO CÁO =====
INSERT INTO "BaoCao" ("maBC", "maChiNhanh", "thangNam", "doanhThu", "soXePhucVu") VALUES
('BC01', 'CN01', '10/2025', 2500000, 12),
('BC02', 'CN02', '10/2025', 1800000, 8);
