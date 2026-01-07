package DACNTT.garage.mapper;

import DACNTT.garage.dto.VehicleDTO;
import DACNTT.garage.model.Vehicle;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface VehicleMapper {

    VehicleDTO toVehicleDTO(Vehicle vehicle);

    Vehicle toVehicle(VehicleDTO vehicleDTO);
}