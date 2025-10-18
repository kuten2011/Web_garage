package DACNTT.garage.service;

import DACNTT.garage.model.RepairPart;
import DACNTT.garage.repository.RepairPartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RepairPartServiceImpl implements RepairPartService {
    @Autowired
    private RepairPartRepository repairPartRepository;

    @Override
    public List<RepairPart> getAllRepairParts() {
        return repairPartRepository.findAll();
    }
}
