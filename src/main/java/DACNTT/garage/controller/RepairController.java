package DACNTT.garage.controller;

import DACNTT.garage.dto.RepairDTO;
import DACNTT.garage.handle.RepairHandle;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.EnumMap;
import java.util.Map;

@RestController
@RequestMapping("/admin/repairs")
public class RepairController {

    @Autowired
    private RepairHandle repairHandle;

    // === Các endpoint cũ giữ nguyên ===
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

    // THANH TOÁN TIỀN MẶT
    @PostMapping("/{maPhieu}/pay-cash")
    public ResponseEntity<?> payWithCash(@PathVariable String maPhieu) {
        return repairHandle.updatePaymentStatus(maPhieu, "Đã thanh toán", "Thanh toán tiền mặt");
    }

    // TẠO QR CHUYỂN KHOẢN
    @GetMapping(value = "/{maPhieu}/qr", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> generateQRCode(@PathVariable String maPhieu) {
        try {
            RepairDTO repair = repairHandle.getRepairDTOById(maPhieu);
            if (repair == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Không tìm thấy phiếu sửa chữa"));
            }

            double tongTien = repair.getTongTien() != null ? repair.getTongTien() : 0.0;
            //String content = String.format("Thanh toan phieu %s - So tien: %.0f VND", maPhieu, tongTien);

            String content = "00020101021238540010A00000072701240006970422011009447998190208QRIBFTTA5303704540625000005802VN62060802Qr63044274";

            Map<EncodeHintType, Object> hints = new EnumMap<>(EncodeHintType.class);
            hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
            hints.put(EncodeHintType.MARGIN, 1);

            QRCodeWriter qrWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrWriter.encode(content, BarcodeFormat.QR_CODE, 350, 350, hints);

            BufferedImage image = MatrixToImageWriter.toBufferedImage(bitMatrix);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            javax.imageio.ImageIO.write(image, "png", baos);

            String base64Image = Base64.getEncoder().encodeToString(baos.toByteArray());
            String qrDataUrl = "data:image/png;base64," + base64Image;

            return ResponseEntity.ok(Map.of(
                    "qrCode", qrDataUrl,
                    "maPhieu", maPhieu,
                    "tongTien", tongTien,
                    "noiDungChuyenKhoan", content
            ));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Lỗi tạo mã QR: " + e.getMessage()));
        }
    }

    // XÁC NHẬN CHUYỂN KHOẢN THỦ CÔNG
    @PostMapping("/{maPhieu}/confirm-payment")
    public ResponseEntity<?> confirmTransferPayment(@PathVariable String maPhieu) {
        return repairHandle.updatePaymentStatus(maPhieu, "Đã thanh toán", "Xác nhận chuyển khoản thủ công");
    }
}