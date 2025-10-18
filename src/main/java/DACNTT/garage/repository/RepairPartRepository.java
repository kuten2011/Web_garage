package DACNTT.garage.repository;

import DACNTT.garage.model.RepairPart;
import DACNTT.garage.model.RepairPartId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepairPartRepository extends JpaRepository<RepairPart, RepairPartId> {
}
