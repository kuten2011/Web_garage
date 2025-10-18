package DACNTT.garage.handle;

import DACNTT.garage.dto.RepairPartDTO;
import DACNTT.garage.mapper.RepairPartMapper;
import DACNTT.garage.model.RepairPart;
import DACNTT.garage.service.RepairPartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class RepairPartHandle {
    @Autowired
    private RepairPartService repairPartService;
    @Autowired
    private RepairPartMapper repairPartMapper;

    public ResponseEntity<List<RepairPartDTO>> getAllRepairParts() {
        List<RepairPart> repairParts = repairPartService.getAllRepairParts();
        List<RepairPartDTO> repairPartDTOs = new ArrayList<>();
        for (RepairPart repairPart : repairParts) {
            repairPartDTOs.add(repairPartMapper.toRepairPartDTO(repairPart));
        }
        return ResponseEntity.ok(repairPartDTOs);
    }
}
