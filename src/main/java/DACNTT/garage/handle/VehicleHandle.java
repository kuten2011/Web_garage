package DACNTT.garage.handle;

import DACNTT.garage.dto.VehicleDTO;
import DACNTT.garage.mapper.VehicleMapper;
import DACNTT.garage.model.Vehicle;
import DACNTT.garage.repository.VehicleRepository;
import DACNTT.garage.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class VehicleHandle {
    @Autowired
    private VehicleService vehicleService;
    @Autowired
    private VehicleMapper vehicleMapper;

    public ResponseEntity<List<VehicleDTO>> getAllVehicles() {
        List<Vehicle> vehicles = vehicleService.getAllVehicles();
        List<VehicleDTO> vehicleDTOs = new ArrayList<>();
        for (Vehicle vehicle : vehicles) {
            vehicleDTOs.add(vehicleMapper.toVehicleDTO(vehicle));
        }
        return ResponseEntity.ok(vehicleDTOs);
    }
}
