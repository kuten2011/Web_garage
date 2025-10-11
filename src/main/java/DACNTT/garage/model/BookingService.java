package DACNTT.garage.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "CT_Lich_DichVu")
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(BookingServiceId.class)
public class BookingService {

    @Id
    @ManyToOne
    @JoinColumn(name = "maLich")
    private Booking booking;

    @Id
    @ManyToOne
    @JoinColumn(name = "maDV")
    private ServiceEntity dichVu;

    private Integer soLuong;
    private String ghiChu;
}
