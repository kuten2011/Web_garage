package DACNTT.garage.service;

import DACNTT.garage.model.Vehicle;
import DACNTT.garage.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public Page<Vehicle> getAllVehicles(Pageable pageable) {
        return vehicleRepository.findAll(pageable);
    }

    @Override
    public Vehicle getVehicleById(String bienSo) {
        return vehicleRepository.findById(bienSo)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy xe biển số: " + bienSo));
    }

    @Override
    public Vehicle createVehicle(Vehicle vehicle) {
        if (vehicleRepository.existsById(vehicle.getBienSo())) {
            throw new RuntimeException("Biển số " + vehicle.getBienSo() + " đã tồn tại!");
        }
        return vehicleRepository.save(vehicle);
    }

    @Override
    public Vehicle updateVehicle(String bienSo, Vehicle updateData) {
        Vehicle existing = getVehicleById(bienSo);
        if (!bienSo.equals(updateData.getBienSo())) {
            throw new RuntimeException("Không được sửa biển số xe!");
        }
        existing.setKhachHang(updateData.getKhachHang());
        existing.setHangXe(updateData.getHangXe());
        existing.setMauXe(updateData.getMauXe());
        existing.setSoKm(updateData.getSoKm());
        existing.setNamSX(updateData.getNamSX());
        return vehicleRepository.save(existing);
    }

    @Override
    public void deleteVehicle(String bienSo) {
        if (!vehicleRepository.existsById(bienSo)) {
            throw new RuntimeException("Không tìm thấy xe để xóa!");
        }
        vehicleRepository.deleteById(bienSo);
    }

    @Override
    public Page<Vehicle> searchVehicles(String search, Integer kmFrom, Integer kmTo,
                                        Integer yearFrom, Integer yearTo, Pageable pageable) {

        return vehicleRepository.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (search != null && !search.isBlank()) {
                String pattern = "%" + search.trim().toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("bienSo")), pattern),
                        cb.like(cb.lower(root.get("khachHang").get("maKH")), pattern),
                        cb.like(cb.lower(root.get("khachHang").get("hoTen")), pattern),
                        cb.like(cb.lower(root.get("hangXe")), pattern)
                ));
            }

            if (kmFrom != null) predicates.add(cb.ge(root.get("soKm"), kmFrom));
            if (kmTo != null) predicates.add(cb.le(root.get("soKm"), kmTo));
            if (yearFrom != null) predicates.add(cb.ge(root.get("namSX"), yearFrom));
            if (yearTo != null) predicates.add(cb.le(root.get("namSX"), yearTo));

            return predicates.isEmpty() ? cb.conjunction() : cb.and(predicates.toArray(new Predicate[0]));
        }, pageable);
    }
}