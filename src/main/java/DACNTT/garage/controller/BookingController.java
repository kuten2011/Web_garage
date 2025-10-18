package DACNTT.garage.controller;

import DACNTT.garage.handle.BookingHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web_garage/bookings")
public class BookingController {
    @Autowired
    private BookingHandle bookingHandle;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<?> getAllBookings() {
        return bookingHandle.getAllBookings();
    }
}
