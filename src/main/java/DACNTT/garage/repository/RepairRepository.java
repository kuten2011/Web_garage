package DACNTT.garage.repository;

import DACNTT.garage.model.Repair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RepairRepository extends JpaRepository<Repair, String> {
    @Query("SELECT r FROM Repair r WHERE r.maPhieu = (SELECT MAX(r2.maPhieu) FROM Repair r2)")
    Optional<Repair> findTopByOrderByMaPhieuDesc();

    boolean existsByMaPhieu(String maPhieu);

    Optional<Repair> findByMaPhieu(String maPhieu);

    @Query("SELECT r FROM Repair r " +
            "LEFT JOIN FETCH r.lichHen lh " +
            "LEFT JOIN FETCH lh.khachHang " +
            "LEFT JOIN FETCH lh.xe " +
            "WHERE r.maPhieu = :maPhieu")
    Optional<Repair> findByIdWithDetails(@Param("maPhieu") String maPhieu);
}