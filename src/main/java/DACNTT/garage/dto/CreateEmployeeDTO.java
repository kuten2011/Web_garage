package DACNTT.garage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CreateEmployeeDTO {
    private String hoTen;
    private String vaiTro;
    private String sdt;
    private String email;
    private String matKhau;
    private String maChiNhanh;
}
