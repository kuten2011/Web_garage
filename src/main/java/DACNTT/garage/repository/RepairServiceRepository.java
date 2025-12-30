package DACNTT.garage.repository;

import DACNTT.garage.model.RepairService;
import DACNTT.garage.model.RepairServiceId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RepairServiceRepository extends JpaRepository<RepairService, RepairServiceId> {
    List<RepairService> findByPhieu_MaPhieu(String maPhieu);
}