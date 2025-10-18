package DACNTT.garage.handle;

import DACNTT.garage.dto.BookingDTO;
import DACNTT.garage.mapper.BookingMapper;
import DACNTT.garage.model.Booking;
import DACNTT.garage.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class BookingHandle {
    @Autowired
    private BookingService bookingService;
    @Autowired
    private BookingMapper bookingMapper;

    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        List<BookingDTO> bookingDTOs = new ArrayList<>();
        for (Booking booking : bookings) {
            bookingDTOs.add(bookingMapper.toBookingDTO(booking));
        }
        return ResponseEntity.ok(bookingDTOs);
    }
}
