package DACNTT.garage.handle;

import DACNTT.garage.dto.CustomerDTO;
import DACNTT.garage.mapper.CustomerMapper;
import DACNTT.garage.model.Customer;
import DACNTT.garage.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CustomerHandle {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private CustomerMapper customerMapper;

    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        List<CustomerDTO> customerDTOs = new ArrayList<>();
        for (Customer customer : customers) {
            customerDTOs.add(customerMapper.toCustomerDTO(customer));
        }
        return ResponseEntity.ok(customerDTOs);
    }
}
