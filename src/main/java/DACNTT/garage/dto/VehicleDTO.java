package DACNTT.garage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class VehicleDTO {
    private String bienSo;
    private String maKH;
    private String hangXe;
    private String mauXe;
    private Integer soKm;
    private Integer namSX;
}
