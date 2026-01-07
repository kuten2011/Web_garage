package DACNTT.garage.handle;

import DACNTT.garage.dto.CreateEmployeeDTO;
import DACNTT.garage.dto.EmployeeDTO;
import DACNTT.garage.dto.security.ErrorResponse;
import DACNTT.garage.mapper.EmployeeMapper;
import DACNTT.garage.model.Employee;
import DACNTT.garage.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EmployeeHandle {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmployeeMapper employeeMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        List<EmployeeDTO> employeeDTOs = new ArrayList<>();
        for (Employee employee : employees) {
            employeeDTOs.add(employeeMapper.toEmployeeDTO(employee));
        }
        return ResponseEntity.ok(employeeDTOs);
    }

    public ResponseEntity<?> createEmployee(CreateEmployeeDTO request) {
        try {
            String encodedPassword = passwordEncoder.encode(request.getMatKhau());

            Employee employee = employeeService.createEmployee(
                    request,
                    encodedPassword
            );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(employeeMapper.toEmployeeDTO(employee));

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }
}
