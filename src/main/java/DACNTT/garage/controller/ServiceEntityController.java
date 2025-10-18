package DACNTT.garage.controller;

import DACNTT.garage.handle.ServiceEntityHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web_garage/serviceEntities")
public class ServiceEntityController {
    @Autowired
    private ServiceEntityHandle serviceEntityHandle;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<?> getAllServiceEntities() {
        return serviceEntityHandle.getAllServiceEntities();
    }
}
