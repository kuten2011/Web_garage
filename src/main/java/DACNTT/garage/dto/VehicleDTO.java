package DACNTT.garage.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class VehicleDTO {
    private String bienSo;
    private String maKH;
    private String tenKH;        // để hiển thị tên khách
    private String hangXe;
    private String mauXe;
    private Integer soKm;
    private Integer namSX;
}