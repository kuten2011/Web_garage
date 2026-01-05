package DACNTT.garage.controller;

import DACNTT.garage.dto.RepairDTO;
import DACNTT.garage.handle.RepairHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin/repairs")
public class RepairController {

    @Autowired
    private RepairHandle repairHandle;

    @GetMapping
    public ResponseEntity<Page<RepairDTO>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "ngayLap,desc") String sort) {
        return repairHandle.getAllRepairs(page, size, sort);
    }

    @GetMapping("/{maPhieu}")
    public ResponseEntity<RepairDTO> getById(@PathVariable String maPhieu) {
        return repairHandle.getRepairById(maPhieu);
    }

    @PostMapping
    public ResponseEntity<RepairDTO> create(@RequestBody RepairDTO dto) {
        return repairHandle.createRepair(dto);
    }

    @PutMapping("/{maPhieu}")
    public ResponseEntity<RepairDTO> update(
            @PathVariable String maPhieu,
            @RequestBody RepairDTO dto) {
        return repairHandle.updateRepair(maPhieu, dto);
    }

    @PatchMapping("/{maPhieu}/status")
    public ResponseEntity<RepairDTO> updateStatus(
            @PathVariable String maPhieu,
            @RequestBody Map<String, String> body) {
        return repairHandle.updateRepairStatus(maPhieu, body);
    }

    @DeleteMapping("/{maPhieu}")
    public ResponseEntity<Void> delete(@PathVariable String maPhieu) {
        return repairHandle.deleteRepair(maPhieu);
    }
}