package DACNTT.garage.controller;

import DACNTT.garage.handle.ReportHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web_garage/reports")
public class ReportController {
    @Autowired
    private ReportHandle reportHandle;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<?> getAllReports() {
        return reportHandle.getAllReports();
    }
}
