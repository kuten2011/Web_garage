package DACNTT.garage.service;

import DACNTT.garage.model.BookingService;
import DACNTT.garage.repository.BookingServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BookingServiceServiceImpl implements BookingServiceService {
    @Autowired
    private BookingServiceRepository bookingServiceRepository;

    @Override
    public List<BookingService> getAllBookingServices() {
        return bookingServiceRepository.findAll();
    }
}
