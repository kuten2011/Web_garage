package DACNTT.garage.handle;

import DACNTT.garage.dto.FeedbackDTO;
import DACNTT.garage.mapper.FeedbackMapper;
import DACNTT.garage.model.Feedback;
import DACNTT.garage.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class FeedbackHandle {

    @Autowired private FeedbackService feedbackService;
    @Autowired private FeedbackMapper feedbackMapper;

    public ResponseEntity<Page<FeedbackDTO>> getAllFeedbacks(int page, int size, String search, String trangThai) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "ngayGui"));
        Page<Feedback> result = feedbackService.getAllFeedbacks(pageable, search, trangThai);
        return ResponseEntity.ok(result.map(feedbackMapper::toFeedbackDTO));
    }

    public ResponseEntity<FeedbackDTO> getFeedbackById(String maPhanHoi) {
        Feedback feedback = feedbackService.getById(maPhanHoi);
        return ResponseEntity.ok(feedbackMapper.toFeedbackDTO(feedback));
    }

    public ResponseEntity<FeedbackDTO> updateFeedback(String maPhanHoi, FeedbackDTO dto) {
        Feedback feedback = feedbackMapper.toEntity(dto);
        feedback.setMaPhanHoi(maPhanHoi);
        Feedback updated = feedbackService.updateFeedback(feedback);
        return ResponseEntity.ok(feedbackMapper.toFeedbackDTO(updated));
    }
}