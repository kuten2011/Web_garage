package DACNTT.garage.model;

import java.io.Serializable;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingServiceId implements Serializable {
    private String booking;
    private String dichVu;
}
