package DACNTT.garage.controller;

import DACNTT.garage.handle.RepairHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web_garage/repairs")
public class RepairController {
    @Autowired
    private RepairHandle repairHandle;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<?> getAllRepairs() {
        return repairHandle.getAllRepairs();
    }
}
