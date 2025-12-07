package DACNTT.garage.handle;

import DACNTT.garage.dto.VehicleDTO;
import DACNTT.garage.mapper.VehicleMapper;
import DACNTT.garage.model.Vehicle;
import DACNTT.garage.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class VehicleHandle {

    @Autowired private VehicleService vehicleService;
    @Autowired private VehicleMapper vehicleMapper;

    public ResponseEntity<Page<VehicleDTO>> getAllVehicles(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("bienSo").ascending());
        Page<Vehicle> vehicles = vehicleService.getAllVehicles(pageable);
        Page<VehicleDTO> dtoPage = vehicles.map(vehicleMapper::toVehicleDTO);
        return ResponseEntity.ok(dtoPage);
    }

    public ResponseEntity<VehicleDTO> getVehicleById(String bienSo) {
        Vehicle vehicle = vehicleService.getVehicleById(bienSo);
        return ResponseEntity.ok(vehicleMapper.toVehicleDTO(vehicle));
    }

    public ResponseEntity<VehicleDTO> createVehicle(VehicleDTO dto) {
        Vehicle vehicle = vehicleMapper.toEntity(dto);
        Vehicle saved = vehicleService.createVehicle(vehicle);
        return ResponseEntity.status(HttpStatus.CREATED).body(vehicleMapper.toVehicleDTO(saved));
    }

    public ResponseEntity<VehicleDTO> updateVehicle(String bienSo, VehicleDTO dto) {
        Vehicle vehicle = vehicleMapper.toEntity(dto);
        Vehicle updated = vehicleService.updateVehicle(bienSo, vehicle);
        return ResponseEntity.ok(vehicleMapper.toVehicleDTO(updated));
    }

    public ResponseEntity<Void> deleteVehicle(String bienSo) {
        vehicleService.deleteVehicle(bienSo);
        return ResponseEntity.noContent().build();
    }
}