package DACNTT.garage.controller;

import DACNTT.garage.dto.RepairPartDTO;
import DACNTT.garage.handle.RepairPartHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RepairPartController {

    @Autowired private RepairPartHandle repairPartHandle;

    @GetMapping("/customer/repair-parts/phieu/{maPhieu}")
    public ResponseEntity<List<RepairPartDTO>> getPartsByPhieu(@PathVariable String maPhieu) {
        return repairPartHandle.getPartsByPhieu(maPhieu);
    }

    // Thêm phụ tùng vào phiếu
    @PostMapping("/admin/repair-parts/phieu/{maPhieu}")
    public ResponseEntity<RepairPartDTO> addPart(
            @PathVariable String maPhieu,
            @RequestBody RepairPartDTO dto) {
        dto.setMaPhieu(maPhieu);
        return repairPartHandle.addPart(dto);
    }

    // Xóa phụ tùng khỏi phiếu
    @DeleteMapping("/admin/repair-parts/phieu/{maPhieu}/phutung/{maPT}")
    public ResponseEntity<Void> removePart(
            @PathVariable String maPhieu,
            @PathVariable String maPT) {
        repairPartHandle.removePart(maPhieu, maPT);
        return ResponseEntity.noContent().build();
    }
}