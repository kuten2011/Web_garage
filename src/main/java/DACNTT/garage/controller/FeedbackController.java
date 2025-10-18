package DACNTT.garage.controller;

import DACNTT.garage.handle.FeedbackHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web_garage/feedbacks")
public class FeedbackController {
    @Autowired
    private FeedbackHandle feedbackHandle;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<?> getAllFeedbacks() {
        return feedbackHandle.getAllFeedbacks();
    }
}
