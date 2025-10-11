package DACNTT.garage.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "PhanHoi")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {

    @Id
    @Column(length = 10)
    private String maPhanHoi;

    @ManyToOne
    @JoinColumn(name = "maKH")
    private Customer khachHang;

    private String noiDung;
    private LocalDateTime ngayGui;
    private String trangThai;

    @ManyToOne
    @JoinColumn(name = "maNVXL", nullable = true)
    private Employee nhanVienXuLy;

    private String phanHoiQL;
}
