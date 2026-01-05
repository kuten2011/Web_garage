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

    // THÊM ENDPOINT NÀY – LẤY DANH SÁCH DỊCH VỤ THEO PHIẾU
    @GetMapping("/phieu/{maPhieu}")
    public ResponseEntity<List<RepairServiceDTO>> getServicesByPhieu(@PathVariable String maPhieu) {
        return repairServiceHandle.getServicesByPhieu(maPhieu);
    }

    // Thêm dịch vụ vào phiếu
    @PostMapping("/phieu/{maPhieu}")
    public ResponseEntity<RepairServiceDTO> addService(
            @PathVariable String maPhieu,
            @RequestBody RepairServiceDTO dto) {
        dto.setMaPhieu(maPhieu);
        return repairServiceHandle.addService(dto);
    }

    // Xóa dịch vụ khỏi phiếu
    @DeleteMapping("/phieu/{maPhieu}/dichvu/{maDV}")
    public ResponseEntity<Void> removeService(
            @PathVariable String maPhieu,
            @PathVariable String maDV) {
        repairServiceHandle.removeService(maPhieu, maDV);
        return ResponseEntity.noContent().build();
    }
}