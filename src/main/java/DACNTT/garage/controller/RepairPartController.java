package DACNTT.garage.controller;

import DACNTT.garage.handle.RepairPartHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web_garage/repairParts")
public class RepairPartController {
    @Autowired
    private RepairPartHandle repairPartHandle;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<?> getAllRepairParts() {
        return repairPartHandle.getAllRepairParts();
    }
}
