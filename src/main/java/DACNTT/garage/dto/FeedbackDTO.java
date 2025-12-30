package DACNTT.garage.dto;

import DACNTT.garage.model.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class FeedbackDTO {
    private String maPhanHoi;
    private String maKH;
    private String noiDung;
    private LocalDateTime ngayGui;
    private String trangThai;
    private String maNVXL;
    private String phanHoiQL;

    private Customer khachHang;
}
