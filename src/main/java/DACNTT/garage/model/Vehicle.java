package DACNTT.garage.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Xe")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    @Column(length = 10)
    private String bienSo;

    @ManyToOne
    @JoinColumn(name = "maKH", nullable = false)
    private Customer khachHang;

    private String hangXe;
    private String mauXe;
    private Integer soKm;
    private Integer namSX;
}
