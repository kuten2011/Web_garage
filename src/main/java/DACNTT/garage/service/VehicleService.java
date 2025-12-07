package DACNTT.garage.service;

import DACNTT.garage.model.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VehicleService {
    Page<Vehicle> getAllVehicles(Pageable pageable);
    Vehicle getVehicleById(String bienSo);
    Vehicle createVehicle(Vehicle vehicle);
    Vehicle updateVehicle(String bienSo, Vehicle vehicle);
    void deleteVehicle(String bienSo);
    Page<Vehicle> searchVehicles(String search, Integer kmFrom, Integer kmTo,
                                 Integer yearFrom, Integer yearTo, Pageable pageable);
}