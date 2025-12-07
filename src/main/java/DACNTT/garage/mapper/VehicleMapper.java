package DACNTT.garage.mapper;

import DACNTT.garage.dto.VehicleDTO;
import DACNTT.garage.model.Vehicle;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VehicleMapper {
    @Mapping(source = "khachHang.maKH", target = "maKH")
    @Mapping(source = "khachHang.hoTen", target = "tenKH")
    VehicleDTO toVehicleDTO(Vehicle vehicle);

    @Mapping(target = "khachHang", ignore = true)
    Vehicle toEntity(VehicleDTO dto);
}