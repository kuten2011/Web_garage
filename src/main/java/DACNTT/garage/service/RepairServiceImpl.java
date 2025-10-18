package DACNTT.garage.service;

import DACNTT.garage.model.Repair;
import DACNTT.garage.repository.RepairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RepairServiceImpl implements RepairService {
    @Autowired
    private RepairRepository repairRepository;

    @Override
    public List<Repair> getAllRepairs() {
        return repairRepository.findAll();
    }
}
