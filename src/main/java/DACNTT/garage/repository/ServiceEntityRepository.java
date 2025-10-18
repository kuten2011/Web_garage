package DACNTT.garage.repository;

import DACNTT.garage.model.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceEntityRepository extends JpaRepository<ServiceEntity, String> {
}
