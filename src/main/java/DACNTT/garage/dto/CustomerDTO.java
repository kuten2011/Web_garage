package DACNTT.garage.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CustomerDTO {
    private String maKH;
    private String hoTen;
    private String sdt;
    private String email;
    private String diaChi;

    @JsonIgnore
    private String matKhau;
}
