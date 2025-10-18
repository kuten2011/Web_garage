package DACNTT.garage.dto;

import DACNTT.garage.model.Booking;
import DACNTT.garage.model.ServiceEntity;
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
public class BookingServiceDTO {
    private String maLich;
    private String maDV;
    private Integer soLuong;
    private String ghiChu;
}
