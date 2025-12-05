package DACNTT.garage.controller;

import DACNTT.garage.dto.PartDTO;
import DACNTT.garage.handle.PartHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/web_garage/parts")
public class PartController {

    @Autowired private PartHandle partHandle;

    @GetMapping
    public ResponseEntity<Page<PartDTO>> searchParts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Double priceFrom,
            @RequestParam(required = false) Double priceTo,
            @RequestParam(required = false) Integer stockFrom,
            @RequestParam(required = false) Integer stockTo,
            @RequestParam(required = false) Integer stockUnder,
            @RequestParam(required = false) Integer stockAbove,
            @RequestParam(defaultValue = "maPT") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        return partHandle.searchParts(page, size, search,
                priceFrom, priceTo, stockFrom, stockTo, stockUnder, stockAbove,
                sortBy, sortDir);
    }

    @GetMapping("/all")
    public ResponseEntity<Page<PartDTO>> getAllParts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return partHandle.getAllParts(page, size);
    }

    @GetMapping("/{maPT}")
    public ResponseEntity<PartDTO> getPart(@PathVariable String maPT) {
        return partHandle.getPartById(maPT);
    }

    @PostMapping
    public ResponseEntity<PartDTO> createPart(@RequestBody PartDTO dto) {
        return partHandle.createPart(dto);
    }

    @PutMapping("/{maPT}")
    public ResponseEntity<PartDTO> updatePart(@PathVariable String maPT, @RequestBody PartDTO dto) {
        return partHandle.updatePart(maPT, dto);
    }

    @DeleteMapping("/{maPT}")
    public ResponseEntity<Void> deletePart(@PathVariable String maPT) {
        return partHandle.deletePart(maPT);
    }
}