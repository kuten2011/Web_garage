package DACNTT.garage.mapper;

import DACNTT.garage.dto.BookingDTO;
import DACNTT.garage.model.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BookingMapper {
    @Mapping(source = "khachHang.maKH", target = "maKH")
    @Mapping(source = "xe.bienSo", target = "bienSo")
    BookingDTO toBookingDTO(Booking booking);
}
