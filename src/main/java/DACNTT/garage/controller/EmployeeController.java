package DACNTT.garage.controller;

import DACNTT.garage.dto.CreateEmployeeDTO;
import DACNTT.garage.dto.EmployeeDTO;
import DACNTT.garage.handle.EmployeeHandle;
import DACNTT.garage.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/employees")
public class EmployeeController {
    @Autowired
    private EmployeeHandle employeeHandle;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<?> getEmployees() {
        return employeeHandle.getAllEmployees();
    }

    @PostMapping(value = "/")
    public ResponseEntity<?> addEmployee(@RequestBody CreateEmployeeDTO employeeDTO) {
        return employeeHandle.createEmployee(employeeDTO);
    }
}
