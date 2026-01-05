package DACNTT.garage.controller;

import DACNTT.garage.handle.CustomerHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/customers")
public class CustomerController {
    @Autowired
    private CustomerHandle customerHandle;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<?> getAllCustomers() {
        return customerHandle.getAllCustomers();
    }
}
