-- Trong PostgreSQL
CREATE EXTENSION IF NOT EXISTS vector;

-- ===============================
-- BẢNG CHI NHÁNH
-- ===============================
CREATE TABLE IF NOT EXISTS "ChiNhanh" (
    "maChiNhanh" VARCHAR(10) PRIMARY KEY,
    "tenChiNhanh" VARCHAR(255),
    "diaChi" TEXT,
    "sdt" VARCHAR(20),
    "email" VARCHAR(100)
    );

-- ===============================
-- BẢNG KHÁCH HÀNG
-- ===============================
CREATE TABLE IF NOT EXISTS "KhachHang" (
    "maKH" VARCHAR(10) PRIMARY KEY,
    "hoTen" VARCHAR(100),
    "sdt" VARCHAR(20),
    "email" VARCHAR(100),
    "diaChi" TEXT,
    "matKhau" VARCHAR(100)
    );

-- ===============================
-- BẢNG NHÂN VIÊN
-- ===============================
CREATE TABLE IF NOT EXISTS "NhanVien" (
    "maNV" VARCHAR(10) PRIMARY KEY,
    "hoTen" VARCHAR(100),
    "vaiTro" VARCHAR(50),
    "sdt" VARCHAR(20),
    "email" VARCHAR(100),
    "matKhau" VARCHAR(100),
    "maChiNhanh" VARCHAR(10),
    CONSTRAINT fk_nv_cn FOREIGN KEY ("maChiNhanh") REFERENCES "ChiNhanh"("maChiNhanh")
    );

-- ===============================
-- BẢNG XE
-- ===============================
CREATE TABLE IF NOT EXISTS "Xe" (
    "bienSo" VARCHAR(10) PRIMARY KEY,
    "maKH" VARCHAR(10) NOT NULL,
    "hangXe" VARCHAR(50),
    "mauXe" VARCHAR(50),
    "soKm" INTEGER,
    "namSX" INTEGER,
    CONSTRAINT fk_xe_kh FOREIGN KEY ("maKH") REFERENCES "KhachHang"("maKH")
    );

-- ===============================
-- BẢNG LỊCH HẸN
-- ===============================
CREATE TABLE IF NOT EXISTS "LichHen" (
    "maLich" VARCHAR(10) PRIMARY KEY,
    "maKH" VARCHAR(10),
    "bienSo" VARCHAR(10),
    "ngayHen" DATE,
    "gioHen" TIME,
    "trangThai" VARCHAR(50),
    CONSTRAINT fk_lich_kh FOREIGN KEY ("maKH") REFERENCES "KhachHang"("maKH"),
    CONSTRAINT fk_lich_xe FOREIGN KEY ("bienSo") REFERENCES "Xe"("bienSo")
    );

-- ===============================
-- BẢNG DỊCH VỤ
-- ===============================
CREATE TABLE IF NOT EXISTS "DichVu" (
    "maDV" VARCHAR(10) PRIMARY KEY,
    "tenDV" VARCHAR(100),
    "giaTien" NUMERIC(12,2),
    "moTa" TEXT
    );

-- ===============================
-- BẢNG CT_LICH_DICHVU
-- ===============================
CREATE TABLE IF NOT EXISTS "CT_Lich_DichVu" (
    "maLich" VARCHAR(10),
    "maDV" VARCHAR(10),
    "soLuong" INTEGER,
    "ghiChu" TEXT,
    PRIMARY KEY ("maLich", "maDV"),
    CONSTRAINT fk_ct_lich FOREIGN KEY ("maLich") REFERENCES "LichHen"("maLich"),
    CONSTRAINT fk_ct_dv FOREIGN KEY ("maDV") REFERENCES "DichVu"("maDV")
    );

-- ===============================
-- BẢNG PHỤ TÙNG
-- ===============================
CREATE TABLE IF NOT EXISTS "PhuTung" (
    "maPT" VARCHAR(10) PRIMARY KEY,
    "tenPT" VARCHAR(100),
    "donGia" NUMERIC(12,2),
    "soLuongTon" INTEGER
    );

-- ===============================
-- BẢNG PHIẾU SỬA CHỮA
-- ===============================
CREATE TABLE IF NOT EXISTS "PhieuSuaChua" (
    "maPhieu" VARCHAR(10) PRIMARY KEY,
    "maLich" VARCHAR(10),
    "maNV" VARCHAR(10),
    "ngayLap" DATE,
    "ghiChu" TEXT,
    "trangThai" VARCHAR(50),
    CONSTRAINT fk_phieu_lich FOREIGN KEY ("maLich") REFERENCES "LichHen"("maLich"),
    CONSTRAINT fk_phieu_nv FOREIGN KEY ("maNV") REFERENCES "NhanVien"("maNV")
    );

-- ===============================
-- BẢNG CT_SuaChua_PhuTung
-- ===============================
CREATE TABLE IF NOT EXISTS "CT_SuaChua_PhuTung" (
    "maPhieu" VARCHAR(10),
    "maPT" VARCHAR(10),
    "soLuong" INTEGER,
    "thanhTien" NUMERIC(12,2),
    PRIMARY KEY ("maPhieu", "maPT"),
    CONSTRAINT fk_ct_phieu FOREIGN KEY ("maPhieu") REFERENCES "PhieuSuaChua"("maPhieu"),
    CONSTRAINT fk_ct_pt FOREIGN KEY ("maPT") REFERENCES "PhuTung"("maPT")
    );

-- ===============================
-- BẢNG PHẢN HỒI
-- ===============================
CREATE TABLE IF NOT EXISTS "PhanHoi" (
    "maPhanHoi" VARCHAR(10) PRIMARY KEY,
    "maKH" VARCHAR(10),
    "noiDung" TEXT,
    "ngayGui" TIMESTAMP,
    "trangThai" VARCHAR(50),
    "maNVXL" VARCHAR(10),
    "phanHoiQL" TEXT,
    CONSTRAINT fk_phanhoi_kh FOREIGN KEY ("maKH") REFERENCES "KhachHang"("maKH"),
    CONSTRAINT fk_phanhoi_nv FOREIGN KEY ("maNVXL") REFERENCES "NhanVien"("maNV")
    );

-- ===============================
-- BẢNG BÁO CÁO
-- ===============================
CREATE TABLE IF NOT EXISTS "BaoCao" (
    "maBC" VARCHAR(10) PRIMARY KEY,
    "maChiNhanh" VARCHAR(10),
    "thangNam" VARCHAR(10),
    "doanhThu" NUMERIC(14,2),
    "soXePhucVu" INTEGER,
    CONSTRAINT fk_bc_cn FOREIGN KEY ("maChiNhanh") REFERENCES "ChiNhanh"("maChiNhanh")
    );

-- ===============================
-- BẢNG THÔNG TIN DỊCH VỤ (ServiceInfo)
-- ===============================
CREATE TABLE IF NOT EXISTS "ThongTinDichVu" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT NOT NULL,
    "category" VARCHAR(100),
    "embedding" vector(768),
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP
    );

-- Tạo index cho vector search
CREATE INDEX embedding_idx ON "ThongTinDichVu"
    USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);

-- Tạo index cho full-text search
CREATE INDEX title_content_idx ON "ThongTinDichVu"
    USING gin(to_tsvector('english', title || ' ' || content));