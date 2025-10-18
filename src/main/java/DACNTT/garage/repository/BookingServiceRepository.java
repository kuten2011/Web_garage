package DACNTT.garage.repository;

import DACNTT.garage.model.BookingService;
import DACNTT.garage.model.BookingServiceId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingServiceRepository extends JpaRepository<BookingService, BookingServiceId> {
}
