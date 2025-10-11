package DACNTT.garage.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "PhieuSuaChua")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Repair {

    @Id
    @Column(length = 10)
    private String maPhieu;

    @ManyToOne
    @JoinColumn(name = "maLich")
    private Booking lichHen;

    @ManyToOne
    @JoinColumn(name = "maNV")
    private Employee nhanVien;

    private LocalDate ngayLap;
    private String ghiChu;
    private String trangThai;
}
