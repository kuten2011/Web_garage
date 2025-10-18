package DACNTT.garage.repository;

import DACNTT.garage.model.Repair;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepairRepository extends JpaRepository<Repair, String> {
}
