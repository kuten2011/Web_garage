package DACNTT.garage.model;

import DACNTT.garage.util.Enum.Role;
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

    @Enumerated(EnumType.STRING)
    private Role role = Role.ROLE_CUSTOMER;
}