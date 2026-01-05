package DACNTT.garage.controller;

import DACNTT.garage.dto.VehicleDTO;
import DACNTT.garage.handle.VehicleHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/vehicles")
public class VehicleController {

    @Autowired private VehicleHandle vehicleHandle;

    @GetMapping
    public ResponseEntity<Page<VehicleDTO>> getAllVehicles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return vehicleHandle.getAllVehicles(page, size);
    }

    @GetMapping("/{bienSo}")
    public ResponseEntity<VehicleDTO> getVehicle(@PathVariable String bienSo) {
        return vehicleHandle.getVehicleById(bienSo);
    }

    @PostMapping
    public ResponseEntity<VehicleDTO> createVehicle(@RequestBody VehicleDTO dto) {
        return vehicleHandle.createVehicle(dto);
    }

    @PutMapping("/{bienSo}")
    public ResponseEntity<VehicleDTO> updateVehicle(@PathVariable String bienSo, @RequestBody VehicleDTO dto) {
        return vehicleHandle.updateVehicle(bienSo, dto);
    }

    @DeleteMapping("/{bienSo}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable String bienSo) {
        return vehicleHandle.deleteVehicle(bienSo);
    }
}