package DACNTT.garage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class RepairDTO {
    private String maPhieu;
    private String maLich;
    private String maNV;
    private LocalDate ngayLap;
    private String ghiChu;
    private String trangThai;

    private CustomerDTO khachHang;
    private VehicleDTO xe;
}