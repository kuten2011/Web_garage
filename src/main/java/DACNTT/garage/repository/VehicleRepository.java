package DACNTT.garage.repository;

import DACNTT.garage.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface VehicleRepository extends JpaRepository<Vehicle, String>, JpaSpecificationExecutor<Vehicle> {
    Page<Vehicle> findAll(Pageable pageable);
}