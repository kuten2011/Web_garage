package DACNTT.garage.service;

import DACNTT.garage.dto.CreateEmployeeDTO;
import DACNTT.garage.dto.security.RegisterRequest;
import DACNTT.garage.model.Branch;
import DACNTT.garage.model.Customer;
import DACNTT.garage.model.Employee;
import DACNTT.garage.repository.BranchRepository;
import DACNTT.garage.repository.EmployeeRepository;
import DACNTT.garage.util.Enum.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private BranchRepository branchRepository;


    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    private String generateEmployeeId() {
        String lastId = employeeRepository.findAll()
                .stream()
                .map(Employee::getMaNV)
                .filter(id -> id.startsWith("NV"))
                .max(Comparator.comparingInt(
                        id -> Integer.parseInt(id.substring(2))
                ))
                .orElse("NV00");

        int nextNumber = Integer.parseInt(lastId.substring(2)) + 1;
        return String.format("NV%02d", nextNumber);
    }

    public boolean isEmailExists(String email) {
        return employeeRepository.existsByEmail(email);
    }

    public boolean isPhoneExists(String sdt) {
        return employeeRepository.existsBySdt(sdt);
    }

    public Employee createEmployee(CreateEmployeeDTO request, String encodedPassword) {
        if (isEmailExists(request.getEmail())) {
            throw new RuntimeException("Email đã được sử dụng");
        }

        if (isPhoneExists(request.getSdt())) {
            throw new RuntimeException("Số điện thoại đã được sử dụng");
        }

        Branch branch = branchRepository.findById(request.getMaChiNhanh())
                .orElseThrow(() -> new RuntimeException("Chi nhánh không tồn tại"));

        Employee employee = new Employee();
        employee.setMaNV(generateEmployeeId());
        employee.setHoTen(request.getHoTen().trim());
        employee.setSdt(request.getSdt());
        employee.setEmail(request.getEmail().toLowerCase());
        employee.setVaiTro(request.getVaiTro() != null ? request.getVaiTro().trim() : "");
        employee.setMatKhau(encodedPassword);
        employee.setChiNhanh(branch);
        employee.setRole(Role.ROLE_EMPLOYEE);

        return employeeRepository.save(employee);
    }
}
