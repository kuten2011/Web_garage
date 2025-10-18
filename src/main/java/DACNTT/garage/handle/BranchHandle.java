package DACNTT.garage.handle;

import DACNTT.garage.dto.BranchDTO;
import DACNTT.garage.mapper.BranchMapper;
import DACNTT.garage.model.Branch;
import DACNTT.garage.service.BranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class BranchHandle {
    @Autowired
    private BranchService branchService;
    @Autowired
    private BranchMapper branchMapper;

    public ResponseEntity<List<BranchDTO>> getAllBranches() {
        List<Branch> branches = branchService.getAllBranches();
        List<BranchDTO> branchDTOs = new ArrayList<>();
        for (Branch branch : branches) {
            branchDTOs.add(branchMapper.toBranchDTO(branch));
        }
        return ResponseEntity.ok(branchDTOs);
    }
}
