package DACNTT.garage.mapper;

import DACNTT.garage.dto.EmployeeDTO;
import DACNTT.garage.model.Branch;
import DACNTT.garage.model.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {
    @Mapping(source = "chiNhanh.maChiNhanh", target = "maChiNhanh")
    EmployeeDTO toEmployeeDTO(Employee employee);

//    @Mapping(target = "chiNhanh", expression = "java(mapBranch(employeeDTO.getMaChiNhanh()))")
//    Employee toEmployee(EmployeeDTO employeeDTO);
//
//    default Branch mapBranch(String maChiNhanh) {
//        if (maChiNhanh == null)
//            return null;
//        Branch branch = new Branch();
//        branch.setMaChiNhanh(maChiNhanh);
//        return branch;
//    }
}
