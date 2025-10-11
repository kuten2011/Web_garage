package DACNTT.garage.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "LichHen")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @Column(length = 10)
    private String maLich;

    @ManyToOne
    @JoinColumn(name = "maKH")
    private Customer khachHang;

    @ManyToOne
    @JoinColumn(name = "bienSo")
    private Vehicle xe;

    private LocalDate ngayHen;
    private LocalTime gioHen;
    private String trangThai;
}
