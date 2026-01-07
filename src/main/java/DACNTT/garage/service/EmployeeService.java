package DACNTT.garage.service;

import DACNTT.garage.dto.CreateEmployeeDTO;
import DACNTT.garage.model.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> getAllEmployees();

    Employee createEmployee(CreateEmployeeDTO request, String encodedPassword);
}
