package DACNTT.garage.repository;

import DACNTT.garage.model.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, String> {

    Page<Feedback> findByTrangThai(String trangThai, Pageable pageable);

    // SỬA ĐÚNG – DÙNG KHACHHANG.MAKH VÀ KHACHHANG.HOTEN
    Page<Feedback> findByNoiDungContainingIgnoreCaseOrKhachHang_MaKHContainingIgnoreCaseOrKhachHang_HoTenContainingIgnoreCase(
            String noiDung, String maKH, String hoTen, Pageable pageable);
}