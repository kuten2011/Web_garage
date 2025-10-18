package DACNTT.garage.handle;

import DACNTT.garage.dto.ServiceEntityDTO;
import DACNTT.garage.mapper.ServiceEntityMapper;
import DACNTT.garage.model.ServiceEntity;
import DACNTT.garage.service.ServiceEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ServiceEntityHandle {
    @Autowired
    private ServiceEntityService serviceEntityService;
    @Autowired
    private ServiceEntityMapper serviceEntityMapper;

    public ResponseEntity<List<ServiceEntityDTO>> getAllServiceEntities() {
        List<ServiceEntity> serviceEntities = serviceEntityService.getAllServiceEntities();
        List<ServiceEntityDTO> serviceEntityDTOs = new ArrayList<>();
        for (ServiceEntity serviceEntity : serviceEntities) {
            serviceEntityDTOs.add(serviceEntityMapper.toServiceEntityDTO(serviceEntity));
        }
        return ResponseEntity.ok(serviceEntityDTOs);
    }
}
