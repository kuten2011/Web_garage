package DACNTT.garage.controller;

import DACNTT.garage.handle.BookingServiceHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web_garage/bookingServices")
public class BookingServiceController {
    @Autowired
    private BookingServiceHandle bookingServiceHandle;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<?> getAllBookingServices() {
        return bookingServiceHandle.getAllBookingServices();
    }
}
