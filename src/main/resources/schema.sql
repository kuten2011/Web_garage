-- ===============================
-- SCHEMA GARA Ô TÔ – ĐÃ SỬA HOÀN HẢO, KHÔNG LỖI KHÓA NGOẠI
-- ===============================

-- BẢNG CHI NHÁNH
CREATE TABLE IF NOT EXISTS "ChiNhanh" (
    "maChiNhanh" VARCHAR(10) PRIMARY KEY,
    "tenChiNhanh" VARCHAR(255),
    "diaChi" TEXT,
    "sdt" VARCHAR(20),
    "email" VARCHAR(100)
);

-- BẢNG KHÁCH HÀNG
CREATE TABLE IF NOT EXISTS "KhachHang" (
    "maKH" VARCHAR(10) PRIMARY KEY,
    "hoTen" VARCHAR(255),
    "sdt" VARCHAR(20),
    "email" VARCHAR(100),
    "diaChi" TEXT,
    "matKhau" VARCHAR(255)
);

-- BẢNG NHÂN VIÊN (TẠO TRƯỚC PHIEUSUACHUA ĐỂ TRÁNH LỖI KHÓA NGOẠI)
CREATE TABLE IF NOT EXISTS "NhanVien" (
    "maNV" VARCHAR(10) PRIMARY KEY,
    "hoTen" VARCHAR(255),
    "vaiTro" VARCHAR(50),
    "sdt" VARCHAR(20),
    "email" VARCHAR(100),
    "matKhau" VARCHAR(255),
    "maChiNhanh" VARCHAR(10),
    CONSTRAINT fk_nv_cn FOREIGN KEY ("maChiNhanh") REFERENCES "ChiNhanh"("maChiNhanh") ON DELETE SET NULL
);

-- BẢNG XE
CREATE TABLE IF NOT EXISTS "Xe" (
    "bienSo" VARCHAR(20) PRIMARY KEY,
    "maKH" VARCHAR(10),
    "hangXe" VARCHAR(100),
    "mauXe" VARCHAR(50),
    "soKm" INTEGER,
    "namSX" INTEGER,
    CONSTRAINT fk_xe_kh FOREIGN KEY ("maKH") REFERENCES "KhachHang"("maKH") ON DELETE CASCADE
);

-- BẢNG LỊCH HẸN
CREATE TABLE IF NOT EXISTS "LichHen" (
    "maLich" VARCHAR(10) PRIMARY KEY,
    "maKH" VARCHAR(10),
    "bienSo" VARCHAR(20),
    "ngayHen" DATE,
    "gioHen" TIME,
    "trangThai" VARCHAR(50) DEFAULT 'Chờ xác nhận',
    CONSTRAINT fk_lh_kh FOREIGN KEY ("maKH") REFERENCES "KhachHang"("maKH") ON DELETE SET NULL,
    CONSTRAINT fk_lh_xe FOREIGN KEY ("bienSo") REFERENCES "Xe"("bienSo") ON DELETE SET NULL
);

-- BẢNG DỊCH VỤ
CREATE TABLE IF NOT EXISTS "DichVu" (
    "maDV" VARCHAR(10) PRIMARY KEY,
    "tenDV" VARCHAR(255),
    "giaTien" NUMERIC(14,2),
    "moTa" TEXT
);

-- BẢNG PHỤ TÙNG
CREATE TABLE IF NOT EXISTS "PhuTung" (
    "maPT" VARCHAR(10) PRIMARY KEY,
    "tenPT" VARCHAR(255),
    "donGia" NUMERIC(14,2),
    "soLuongTon" INTEGER DEFAULT 0
);

-- BẢNG PHIẾU SỬA CHỮA (TẠO SAU NHÂN VIÊN)
CREATE TABLE IF NOT EXISTS "PhieuSuaChua" (
    "maPhieu" VARCHAR(20) PRIMARY KEY,
    "maLich" VARCHAR(10),
    "maNV" VARCHAR(10),
    "ngayLap" DATE,
    "ghiChu" TEXT,
    "trangThai" VARCHAR(50) DEFAULT 'Chờ tiếp nhận',
    CONSTRAINT fk_psc_lh FOREIGN KEY ("maLich") REFERENCES "LichHen"("maLich") ON DELETE SET NULL,
    CONSTRAINT fk_psc_nv FOREIGN KEY ("maNV") REFERENCES "NhanVien"("maNV") ON DELETE SET NULL
);

-- BẢNG CHI TIẾT SỬA CHỮA – PHỤ TÙNG
CREATE TABLE IF NOT EXISTS "CT_SuaChua_PhuTung" (
    "maPhieu" VARCHAR(20),
    "maPT" VARCHAR(10),
    "soLuong" INTEGER,
    "thanhTien" NUMERIC(14,2),
    PRIMARY KEY ("maPhieu", "maPT"),
    CONSTRAINT fk_ctpt_psc FOREIGN KEY ("maPhieu") REFERENCES "PhieuSuaChua"("maPhieu") ON DELETE CASCADE,
    CONSTRAINT fk_ctpt_pt FOREIGN KEY ("maPT") REFERENCES "PhuTung"("maPT") ON DELETE CASCADE
);

-- BẢNG CHI TIẾT SỬA CHỮA – DỊCH VỤ
CREATE TABLE IF NOT EXISTS "CT_SuaChua_DichVu" (
    "maPhieu" VARCHAR(20),
    "maDV" VARCHAR(10),
    "soLuong" INTEGER,
    "ghiChu" TEXT,
    "thanhTien" NUMERIC(14,2),
    PRIMARY KEY ("maPhieu", "maDV"),
    CONSTRAINT fk_ctdv_psc FOREIGN KEY ("maPhieu") REFERENCES "PhieuSuaChua"("maPhieu") ON DELETE CASCADE,
    CONSTRAINT fk_ctdv_dv FOREIGN KEY ("maDV") REFERENCES "DichVu"("maDV") ON DELETE CASCADE
);

-- BẢNG PHẢN HỒI
CREATE TABLE IF NOT EXISTS "PhanHoi" (
    "maPhanHoi" VARCHAR(10) PRIMARY KEY,
    "maKH" VARCHAR(10),
    "noiDung" TEXT,
    "ngayGui" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "trangThai" VARCHAR(50) DEFAULT 'Chưa xử lý',
    "maNVXL" VARCHAR(10),
    "phanHoiQL" TEXT,
    CONSTRAINT fk_ph_kh FOREIGN KEY ("maKH") REFERENCES "KhachHang"("maKH") ON DELETE SET NULL,
    CONSTRAINT fk_ph_nv FOREIGN KEY ("maNVXL") REFERENCES "NhanVien"("maNV") ON DELETE SET NULL
);

-- BẢNG BÁO CÁO
CREATE TABLE IF NOT EXISTS "BaoCao" (
    "maBC" VARCHAR(10) PRIMARY KEY,
    "maChiNhanh" VARCHAR(10),
    "thangNam" VARCHAR(10),
    "doanhThu" NUMERIC(14,2),
    "soXePhucVu" INTEGER,
    CONSTRAINT fk_bc_cn FOREIGN KEY ("maChiNhanh") REFERENCES "ChiNhanh"("maChiNhanh") ON DELETE SET NULL
);