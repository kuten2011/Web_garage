package DACNTT.garage.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "KhachHang")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @Column(length = 10)
    private String maKH;

    private String hoTen;
    private String sdt;
    private String email;
    private String diaChi;
    private String matKhau;
}
