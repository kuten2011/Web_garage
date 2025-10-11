package DACNTT.garage.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "PhuTung")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Part {

    @Id
    @Column(length = 10)
    private String maPT;

    private String tenPT;
    private Double donGia;
    private Integer soLuongTon;
}

