package DACNTT.garage.repository;

import DACNTT.garage.model.Repair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RepairRepository extends JpaRepository<Repair, String> {
    @Query("SELECT r FROM Repair r WHERE r.maPhieu = (SELECT MAX(r2.maPhieu) FROM Repair r2)")
    Optional<Repair> findTopByOrderByMaPhieuDesc();

    boolean existsByMaPhieu(String maPhieu);

    Optional<Repair> findByMaPhieu(String maPhieu);
}