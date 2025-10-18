package DACNTT.garage.mapper;

import DACNTT.garage.dto.BookingServiceDTO;
import DACNTT.garage.model.BookingService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BookingServiceMapper {
    @Mapping(source = "booking.maLich", target = "maLich")
    @Mapping(source = "dichVu.maDV", target = "maDV")
    BookingServiceDTO toBookingServiceDTO(BookingService bookingService);
}
