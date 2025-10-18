package DACNTT.garage.mapper;

import DACNTT.garage.dto.VehicleDTO;
import DACNTT.garage.model.Vehicle;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VehicleMapper {
    @Mapping(source = "khachHang.maKH", target = "maKH")
    VehicleDTO toVehicleDTO(Vehicle vehicle);
}
