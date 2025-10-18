package DACNTT.garage.handle;

import DACNTT.garage.dto.FeedbackDTO;
import DACNTT.garage.mapper.FeedbackMapper;
import DACNTT.garage.model.Feedback;
import DACNTT.garage.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FeedbackHandle {
    @Autowired
    private FeedbackService feedbackService;
    @Autowired
    private FeedbackMapper feedbackMapper;

    public ResponseEntity<List<FeedbackDTO>> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackService.getAllFeedbacks();
        List<FeedbackDTO> feedbackDTOs = new ArrayList<>();
        for (Feedback feedback : feedbacks) {
            feedbackDTOs.add(feedbackMapper.toFeedbackDTO(feedback));
        }
        return ResponseEntity.ok(feedbackDTOs);
    }
}
