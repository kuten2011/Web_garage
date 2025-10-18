package DACNTT.garage.dto;

import DACNTT.garage.model.Part;
import DACNTT.garage.model.Repair;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class RepairPartDTO {
    private String maPhieu;
    private String maPT;
    private Integer soLuong;
    private Double thanhTien;
}
