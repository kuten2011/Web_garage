package DACNTT.garage.handle;

import DACNTT.garage.dto.CustomerDTO;
import DACNTT.garage.dto.security.ErrorResponse;
import DACNTT.garage.dto.security.RegisterRequest;
import DACNTT.garage.mapper.CustomerMapper;
import DACNTT.garage.model.Customer;
import DACNTT.garage.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CustomerHandle {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private CustomerMapper customerMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        List<CustomerDTO> customerDTOs = new ArrayList<>();
        for (Customer customer : customers) {
            customerDTOs.add(customerMapper.toCustomerDTO(customer));
        }
        return ResponseEntity.ok(customerDTOs);
    }

    public ResponseEntity<?> registerCustomer(RegisterRequest request) {
        try {
            String encodedPassword = passwordEncoder.encode(request.getMatKhau());

            Customer customer = customerService.registerCustomer(
                    request,
                    encodedPassword
            );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(customerMapper.toCustomerDTO(customer));

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

}
