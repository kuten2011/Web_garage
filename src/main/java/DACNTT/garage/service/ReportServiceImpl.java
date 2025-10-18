package DACNTT.garage.service;

import DACNTT.garage.model.Report;
import DACNTT.garage.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ReportServiceImpl implements ReportService {
    @Autowired
    private ReportRepository reportRepository;

    @Override
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }
}
