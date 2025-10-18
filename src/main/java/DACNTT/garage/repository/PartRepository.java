package DACNTT.garage.repository;

import DACNTT.garage.model.Part;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartRepository extends JpaRepository<Part, String> {
}
