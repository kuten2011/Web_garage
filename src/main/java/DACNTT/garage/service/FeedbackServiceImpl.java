package DACNTT.garage.service;

import DACNTT.garage.model.Feedback;
import DACNTT.garage.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired private FeedbackRepository feedbackRepository;

    @Override
    public Page<Feedback> getAllFeedbacks(Pageable pageable, String search, String trangThai) {
        if ((search == null || search.trim().isEmpty()) && (trangThai == null || trangThai.isEmpty())) {
            return feedbackRepository.findAll(pageable);
        }

        if (search != null && !search.trim().isEmpty()) {
            String pattern = "%" + search.trim().toLowerCase() + "%";
            return feedbackRepository.findByNoiDungContainingIgnoreCaseOrKhachHang_MaKHContainingIgnoreCaseOrKhachHang_HoTenContainingIgnoreCase(
                    pattern, pattern, pattern, pageable);
        }

        if (trangThai != null && !trangThai.isEmpty()) {
            return feedbackRepository.findByTrangThai(trangThai, pageable);
        }

        return feedbackRepository.findAll(pageable);
    }

    @Override
    public Feedback getById(String maPhanHoi) {
        return feedbackRepository.findById(maPhanHoi)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phản hồi: " + maPhanHoi));
    }

    @Override
    public Feedback updateFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }
}