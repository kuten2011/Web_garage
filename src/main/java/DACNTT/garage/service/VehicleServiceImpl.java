package DACNTT.garage.service;

import DACNTT.garage.model.Vehicle;
import DACNTT.garage.repository.CustomerRepository;
import DACNTT.garage.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.criteria.Predicate;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Page<Vehicle> getAllVehicles(Pageable pageable) {
        return vehicleRepository.findAll(pageable);
    }

    @Override
    public Optional<Vehicle> getVehicleById(String bienSo) {
        return vehicleRepository.findById(bienSo);
    }

    @Override
    public Vehicle createVehicle(Vehicle vehicle) {
        if (vehicleRepository.existsById(vehicle.getBienSo())) {
            throw new RuntimeException("Biển số " + vehicle.getBienSo() + " đã tồn tại!");
        }

        // Nếu chưa có lịch bảo dưỡng → set mặc định từ hôm nay
        if (vehicle.getChuKyBaoDuongThang() != null && vehicle.getNgayBaoDuongTiepTheo() == null) {
            vehicle.setNgayBaoDuongTiepTheo(
                    LocalDate.now().plusMonths(vehicle.getChuKyBaoDuongThang())
            );
        }

        return vehicleRepository.save(vehicle);
    }

    @Override
    public Vehicle updateVehicle(String bienSo, Vehicle updateData) {
        Vehicle existing = getVehicleById(bienSo)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy xe"));

        if (!bienSo.equals(updateData.getBienSo())) {
            throw new RuntimeException("Không được sửa biển số xe!");
        }

        customerRepository.findById(updateData.getMaKH())
                .orElseThrow(() -> new RuntimeException("Khách hàng không tồn tại"));

        existing.setHangXe(updateData.getHangXe());
        existing.setMauXe(updateData.getMauXe());
        existing.setSoKm(updateData.getSoKm());
        existing.setNamSX(updateData.getNamSX());
        existing.setChuKyBaoDuongKm(updateData.getChuKyBaoDuongKm());
        existing.setChuKyBaoDuongThang(updateData.getChuKyBaoDuongThang());

        // Nếu thay chu kỳ → tính lại hạn bảo dưỡng từ hôm nay
        if (updateData.getChuKyBaoDuongThang() != null) {
            existing.setNgayBaoDuongTiepTheo(
                    LocalDate.now().plusMonths(updateData.getChuKyBaoDuongThang())
            );
        }

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

    @Override
    public Page<Vehicle> findByNgayBaoDuongTiepTheoBefore(LocalDate date, Pageable pageable) {
        return vehicleRepository.findByNgayBaoDuongTiepTheoBefore(date, pageable);
    }

    @Override
    public Page<Vehicle> findByNgayBaoDuongTiepTheoBetween(LocalDate from, LocalDate to, Pageable pageable) {
        return vehicleRepository.findByNgayBaoDuongTiepTheoBetween(from, to, pageable);
    }

    @Override
    public Page<Vehicle> findByNgayBaoDuongTiepTheoAfter(LocalDate date, Pageable pageable) {
        return vehicleRepository.findByNgayBaoDuongTiepTheoAfter(date, pageable);
    }

}
