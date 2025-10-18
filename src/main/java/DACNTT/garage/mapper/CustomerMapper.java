package DACNTT.garage.mapper;

import DACNTT.garage.dto.CustomerDTO;
import DACNTT.garage.model.Customer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    CustomerDTO toCustomerDTO(Customer customer);
}
