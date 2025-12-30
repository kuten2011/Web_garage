-- ===============================
-- THÊM DỮ LIỆU MẪU – ĐÃ SỬA HOÀN HẢO (KHÔNG LỖI DUPLICATE, KHÔNG LỖI KHÓA NGOẠI)
-- ===============================

-- 1. CHI NHÁNH (tạo trước)
INSERT INTO "ChiNhanh" ("maChiNhanh", "tenChiNhanh", "diaChi", "sdt", "email") VALUES
('CN01', 'Chi nhánh Quận 1', '123 Nguyễn Huệ, Q1, TP.HCM', '0909123456', 'cn1@gara.com')
ON CONFLICT ("maChiNhanh") DO NOTHING;

INSERT INTO "ChiNhanh" ("maChiNhanh", "tenChiNhanh", "diaChi", "sdt", "email") VALUES
('CN02', 'Chi nhánh Quận 7', '456 Nguyễn Văn Linh, Q7, TP.HCM', '0909876543', 'cn2@gara.com')
ON CONFLICT ("maChiNhanh") DO NOTHING;

-- 2. NHÂN VIÊN (tạo trước PhieuSuaChua)
INSERT INTO "NhanVien" ("maNV", "hoTen", "vaiTro", "sdt", "email", "matKhau", "maChiNhanh") VALUES
('NV01', 'Lê Văn C', 'Kỹ thuật viên', '0911111111', 'c@gara.com', '123456', 'CN01')
ON CONFLICT ("maNV") DO NOTHING;

INSERT INTO "NhanVien" ("maNV", "hoTen", "vaiTro", "sdt", "email", "matKhau", "maChiNhanh") VALUES
('NV02', 'Phạm Thị D', 'Quản lý', '0922222222', 'd@gara.com', '123456', 'CN02')
ON CONFLICT ("maNV") DO NOTHING;

-- 3. KHÁCH HÀNG
INSERT INTO "KhachHang" ("maKH", "hoTen", "sdt", "email", "diaChi", "matKhau") VALUES
('KH01', 'Nguyễn Văn A', '0912345678', 'vana@gmail.com', 'Q1, TP.HCM', '123456')
ON CONFLICT ("maKH") DO NOTHING;

INSERT INTO "KhachHang" ("maKH", "hoTen", "sdt", "email", "diaChi", "matKhau") VALUES
('KH02', 'Trần Thị B', '0987654321', 'thib@gmail.com', 'Q7, TP.HCM', '123456')
ON CONFLICT ("maKH") DO NOTHING;

-- 4. XE
INSERT INTO "Xe" ("bienSo", "maKH", "hangXe", "mauXe", "soKm", "namSX") VALUES
('59A-12345', 'KH01', 'Toyota', 'Vios', 50000, 2020)
ON CONFLICT ("bienSo") DO NOTHING;

INSERT INTO "Xe" ("bienSo", "maKH", "hangXe", "mauXe", "soKm", "namSX") VALUES
('51B-67890', 'KH02', 'Honda', 'City', 80000, 2019)
ON CONFLICT ("bienSo") DO NOTHING;

-- 5. LỊCH HẸN
INSERT INTO "LichHen" ("maLich", "maKH", "bienSo", "ngayHen", "gioHen", "trangThai") VALUES
('LH01', 'KH01', '59A-12345', '2025-10-15', '09:00:00', 'Chờ xác nhận')
ON CONFLICT ("maLich") DO NOTHING;

INSERT INTO "LichHen" ("maLich", "maKH", "bienSo", "ngayHen", "gioHen", "trangThai") VALUES
('LH02', 'KH02', '51B-67890', '2025-10-16', '14:00:00', 'Đã xác nhận')
ON CONFLICT ("maLich") DO NOTHING;

-- 6. DỊCH VỤ
INSERT INTO "DichVu" ("maDV", "tenDV", "giaTien", "moTa") VALUES
('DV01', 'Thay dầu máy', 500000, 'Thay dầu động cơ 5W30')
ON CONFLICT ("maDV") DO NOTHING;

INSERT INTO "DichVu" ("maDV", "tenDV", "giaTien", "moTa") VALUES
('DV02', 'Bảo dưỡng 10.000km', 1500000, 'Kiểm tra toàn bộ xe')
ON CONFLICT ("maDV") DO NOTHING;

-- 7. PHỤ TÙNG
INSERT INTO "PhuTung" ("maPT", "tenPT", "donGia", "soLuongTon") VALUES
('PT01', 'Dầu máy 5W30', 450000, 50)
ON CONFLICT ("maPT") DO NOTHING;

INSERT INTO "PhuTung" ("maPT", "tenPT", "donGia", "soLuongTon") VALUES
('PT02', 'Lọc dầu', 250000, 30)
ON CONFLICT ("maPT") DO NOTHING;

-- 8. PHIẾU SỬA CHỮA (tạo SAU khi đã có NhanVien & LichHen)
INSERT INTO "PhieuSuaChua" ("maPhieu", "maLich", "maNV", "ngayLap", "ghiChu", "trangThai") VALUES
('PSC01', 'LH01', 'NV01', '2025-10-14', 'Thay dầu + lọc', 'Chờ tiếp nhận')
ON CONFLICT ("maPhieu") DO NOTHING;

-- 9. CHI TIẾT SỬA CHỮA – PHỤ TÙNG
INSERT INTO "CT_SuaChua_PhuTung" ("maPhieu", "maPT", "soLuong", "thanhTien") VALUES
('PSC01', 'PT01', 1, 450000)
ON CONFLICT ("maPhieu", "maPT") DO NOTHING;

INSERT INTO "CT_SuaChua_PhuTung" ("maPhieu", "maPT", "soLuong", "thanhTien") VALUES
('PSC01', 'PT02', 1, 250000)
ON CONFLICT ("maPhieu", "maPT") DO NOTHING;

-- 10. CHI TIẾT SỬA CHỮA – DỊCH VỤ
INSERT INTO "CT_SuaChua_DichVu" ("maPhieu", "maDV", "soLuong", "ghiChu", "thanhTien") VALUES
('PSC01', 'DV01', 1, 'Thay dầu máy', 500000)
ON CONFLICT ("maPhieu", "maDV") DO NOTHING;

-- 11. PHẢN HỒI
INSERT INTO "PhanHoi" ("maPhanHoi", "maKH", "noiDung", "ngayGui", "trangThai", "maNVXL", "phanHoiQL") VALUES
('PH01', 'KH01', 'Xe chạy êm hơn sau bảo dưỡng!', '2025-10-15 10:30:00', 'Đã phản hồi', 'NV01', 'Cảm ơn khách hàng!')
ON CONFLICT ("maPhanHoi") DO NOTHING;

-- 12. BÁO CÁO
INSERT INTO "BaoCao" ("maBC", "maChiNhanh", "thangNam", "doanhThu", "soXePhucVu") VALUES
('BC01', 'CN01', '10/2025', 2500000, 12)
ON CONFLICT ("maBC") DO NOTHING;

INSERT INTO "BaoCao" ("maBC", "maChiNhanh", "thangNam", "doanhThu", "soXePhucVu") VALUES
('BC02', 'CN02', '10/2025', 1800000, 8)
ON CONFLICT ("maBC") DO NOTHING;