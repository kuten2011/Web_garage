package DACNTT.garage.handle;

import DACNTT.garage.dto.BookingServiceDTO;
import DACNTT.garage.mapper.BookingServiceMapper;
import DACNTT.garage.model.BookingService;
import DACNTT.garage.service.BookingServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class BookingServiceHandle {
    @Autowired
    private BookingServiceService bookingServiceService;
    @Autowired
    private BookingServiceMapper bookingServiceMapper;

    public ResponseEntity<List<BookingServiceDTO>> getAllBookingServices() {
        List<BookingService> bookingServices = bookingServiceService.getAllBookingServices();
        List<BookingServiceDTO> bookingServiceDTOs = new ArrayList<>();
        for (BookingService bookingService : bookingServices) {
            bookingServiceDTOs.add(bookingServiceMapper.toBookingServiceDTO(bookingService));
        }
        return ResponseEntity.ok(bookingServiceDTOs);
    }
}
