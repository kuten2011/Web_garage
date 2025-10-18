package DACNTT.garage.handle;

import DACNTT.garage.dto.ReportDTO;
import DACNTT.garage.mapper.ReportMapper;
import DACNTT.garage.model.Report;
import DACNTT.garage.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReportHandle {
    @Autowired
    private ReportService reportService;
    @Autowired
    private ReportMapper reportMapper;

    public ResponseEntity<List<ReportDTO>> getAllReports() {
        List<Report> reports = reportService.getAllReports();
        List<ReportDTO> reportDTOs = new ArrayList<>();
        for (Report report : reports) {
            reportDTOs.add(reportMapper.toReportDTO(report));
        }
        return ResponseEntity.ok(reportDTOs);
    }
}
