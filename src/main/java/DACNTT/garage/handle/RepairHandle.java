package DACNTT.garage.handle;

import DACNTT.garage.dto.RepairDTO;
import DACNTT.garage.mapper.RepairMapper;
import DACNTT.garage.model.Repair;
import DACNTT.garage.service.RepairService;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class RepairHandle {

    @Autowired
    private RepairService repairService;

    @Autowired
    private RepairMapper repairMapper;

    public ResponseEntity<Page<RepairDTO>> getAllRepairs(int page, int size, String sort) {
        Sort sortable = Sort.by(Sort.Direction.DESC, "ngayLap");
        if (sort != null && sort.contains(",")) {
            try {
                String[] parts = sort.split(",");
                String field = parts[0].trim();
                String dir = parts.length > 1 ? parts[1].trim().toUpperCase() : "DESC";

                if (List.of("maPhieu", "ngayLap", "trangThai").contains(field)) {
                    sortable = Sort.by("ASC".equals(dir) ? Sort.Direction.ASC : Sort.Direction.DESC, field);
                }
            } catch (Exception ignored) {}
        }

        Pageable pageable = PageRequest.of(page, size, sortable);
        Page<Repair> repairPage = repairService.getAllRepairs(pageable);
        Page<RepairDTO> dtoPage = repairPage.map(repairMapper::toRepairDTO);

        return ResponseEntity.ok(dtoPage);
    }

    public ResponseEntity<RepairDTO> createRepair(RepairDTO dto) {
        try {
            if (dto.getMaPhieu() != null && !dto.getMaPhieu().isBlank()) {
                return ResponseEntity.badRequest().build();
            }

            Repair repair = repairMapper.toRepair(dto);
            Repair saved = repairService.createRepair(repair);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(repairMapper.toRepairDTO(saved));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    public ResponseEntity<RepairDTO> updateRepair(String maPhieu, RepairDTO dto) {
        try {
            if (!maPhieu.equals(dto.getMaPhieu())) {
                return ResponseEntity.badRequest().build();
            }

            Repair repair = repairMapper.toRepair(dto);
            Repair updated = repairService.update(maPhieu, repair);
            return ResponseEntity.ok(repairMapper.toRepairDTO(updated));

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<RepairDTO> updateRepairStatus(String maPhieu, Map<String, String> body) {
        String trangThai = body.get("trangThai");
        if (trangThai == null || trangThai.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            Repair updated = repairService.updateStatus(maPhieu, trangThai);
            return ResponseEntity.ok(repairMapper.toRepairDTO(updated));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<Void> deleteRepair(String maPhieu) {
        try {
            repairService.deleteById(maPhieu);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    public ResponseEntity<RepairDTO> getRepairById(String maPhieu) {
        Repair repair = repairService.getRepairById(maPhieu);
        return ResponseEntity.ok(repairMapper.toRepairDTO(repair));
    }

    public ResponseEntity<RepairDTO> confirmTransferPayment(String maPhieu) {
        Repair repair = repairService.getRepairById(maPhieu);
        if (repair == null) {
            return ResponseEntity.notFound().build();
        }
        // Cập nhật trạng thái
        repair.setThanhToanStatus("Đã thanh toán");
        repair.setTrangThai("Hoàn thành");
        repair = repairService.save(repair);
        return ResponseEntity.ok(repairMapper.toRepairDTO(repair));
    }

    public ResponseEntity<?> updatePaymentStatus(String maPhieu, String status, String ghiChu) {
        try {
            Repair repair = repairService.getRepairById(maPhieu);
            if (repair == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Không tìm thấy phiếu sửa chữa"));
            }
            repair.setThanhToanStatus(status);
            if ("Đã thanh toán".equals(status)) {
                repair.setTrangThai("Hoàn thành");
            }
            Repair updated = repairService.update(maPhieu, repair);

            return ResponseEntity.ok(Map.of(
                    "message", "Cập nhật trạng thái thanh toán thành công",
                    "maPhieu", maPhieu,
                    "thanhToanStatus", status,
                    "trangThai", updated.getTrangThai()
            ));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Lỗi cập nhật: " + e.getMessage()));
        }
    }

    public RepairDTO getRepairDTOById(String maPhieu) {
        Repair repair = repairService.getRepairById(maPhieu);
        if (repair == null) return null;

        RepairDTO dto = repairMapper.toRepairDTO(repair);

        dto.setTongTien(0.0);
        dto.setThanhToanStatus(repair.getThanhToanStatus() != null ? repair.getThanhToanStatus() : "Chưa thanh toán");

        return dto;
    }
}