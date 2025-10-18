package DACNTT.garage.controller;

import DACNTT.garage.handle.VehicleHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web_garage/vehicles")
public class VehicleController {
    @Autowired
    private VehicleHandle vehicleHandle;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<?> getAllVehicles() {
        return vehicleHandle.getAllVehicles();
    }
}
