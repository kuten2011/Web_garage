package DACNTT.garage.service;

import DACNTT.garage.model.ServiceEntity;
import DACNTT.garage.repository.ServiceEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ServiceEntityServiceImpl implements ServiceEntityService {
    @Autowired
    private ServiceEntityRepository serviceEntityRepository;

    @Override
    public List<ServiceEntity> getAllServiceEntities() {
        return serviceEntityRepository.findAll();
    }
}
