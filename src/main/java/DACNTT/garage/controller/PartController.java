package DACNTT.garage.controller;

import DACNTT.garage.handle.PartHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web_garage/parts")
public class PartController {
    @Autowired
    private PartHandle partHandle;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<?> getAllParts() {
        return partHandle.getAllParts();
    }
}
