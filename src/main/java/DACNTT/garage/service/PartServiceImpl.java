package DACNTT.garage.service;

import DACNTT.garage.model.Part;
import DACNTT.garage.repository.PartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PartServiceImpl implements PartService{
    @Autowired
    private PartRepository partRepository;

    @Override
    public List<Part> getAllParts() {
        return partRepository.findAll();
    }
}
