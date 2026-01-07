package DACNTT.garage.service;

import DACNTT.garage.dto.security.RegisterRequest;
import DACNTT.garage.model.Customer;

import java.util.List;

public interface CustomerService {
    List<Customer> getAllCustomers();
    Customer registerCustomer(RegisterRequest request, String encodedPassword);
}
