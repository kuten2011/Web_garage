package DACNTT.garage.controller;

import DACNTT.garage.dto.RepairServiceDTO;
import DACNTT.garage.handle.RepairServiceHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/repair-services")
public class RepairServiceController {

    @Autowired
    private RepairServiceHandle repairServiceHandle;

    @GetMapping("/phieu/{maPhieu}")
    public ResponseEntity<List<RepairServiceDTO>> getServicesByPhieu(@PathVariable String maPhieu) {
        return repairServiceHandle.getServicesByPhieu(maPhieu);
    }

    @PostMapping("/phieu/{maPhieu}")
    public ResponseEntity<RepairServiceDTO> addService(
            @PathVariable String maPhieu,
            @RequestBody RepairServiceDTO dto) {
        dto.setMaPhieu(maPhieu);
        return repairServiceHandle.addService(dto);
    }

    @DeleteMapping("/phieu/{maPhieu}/dichvu/{maDV}")
    public ResponseEntity<Void> removeService(
            @PathVariable String maPhieu,
            @PathVariable String maDV) {
        repairServiceHandle.removeService(maPhieu, maDV);
        return ResponseEntity.noContent().build();
    }
}