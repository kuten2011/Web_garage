package DACNTT.garage.handle;

import DACNTT.garage.dto.RepairDTO;
import DACNTT.garage.mapper.RepairMapper;
import DACNTT.garage.model.Repair;
import DACNTT.garage.service.RepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class RepairHandle {
    @Autowired
    private RepairService repairService;
    @Autowired
    private RepairMapper repairMapper;

    public ResponseEntity<List<RepairDTO>> getAllRepairs() {
        List<Repair> repairs = repairService.getAllRepairs();
        List<RepairDTO> repairDTOs = new ArrayList<>();
        for (Repair repair : repairs) {
            repairDTOs.add(repairMapper.toRepairDTO(repair));
        }
        return ResponseEntity.ok(repairDTOs);
    }
}
