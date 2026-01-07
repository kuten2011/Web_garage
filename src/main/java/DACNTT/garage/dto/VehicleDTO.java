// src/main/java/DACNTT/garage/dto/VehicleDTO.java
package DACNTT.garage.dto;

import lombok.*;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class VehicleDTO {
    private String bienSo;
    private String maKH;
    private String tenKH; // nếu bạn dùng để hiển thị tên khách hàng
    private String hangXe;
    private String mauXe;
    private Integer soKm;
    private Integer namSX;

    // === BỔ SUNG ĐẦY ĐỦ 4 FIELD MỚI ĐỂ LƯU ĐƯỢC NGÀY VÀ CHU KỲ ===
    private LocalDate ngayBaoHanhDen;
    private LocalDate ngayBaoDuongTiepTheo;
    private Integer chuKyBaoDuongKm;
    private Integer chuKyBaoDuongThang;
}