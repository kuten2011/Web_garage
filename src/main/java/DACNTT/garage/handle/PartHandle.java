package DACNTT.garage.handle;

import DACNTT.garage.dto.PartDTO;
import DACNTT.garage.mapper.PartMapper;
import DACNTT.garage.model.Part;
import DACNTT.garage.service.PartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PartHandle {
    @Autowired
    private PartService partService;
    @Autowired
    private PartMapper partMapper;

    public ResponseEntity<List<PartDTO>> getAllParts() {
        List<Part> parts = partService.getAllParts();
        List<PartDTO> partDTOs = new ArrayList<>();
        for (Part part : parts) {
            partDTOs.add(partMapper.toPartDTO(part));
        }
        return ResponseEntity.ok(partDTOs);
    }
}
