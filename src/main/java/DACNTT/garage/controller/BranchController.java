package DACNTT.garage.controller;

import DACNTT.garage.handle.BranchHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web_garage/branches")
public class BranchController {
    @Autowired
    private BranchHandle branchHandle;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<?> getAllBranches() {
        return branchHandle.getAllBranches();
    }
}
