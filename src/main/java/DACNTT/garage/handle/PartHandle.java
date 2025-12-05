package DACNTT.garage.handle;

import DACNTT.garage.dto.PartDTO;
import DACNTT.garage.mapper.PartMapper;
import DACNTT.garage.model.Part;
import DACNTT.garage.service.PartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PartHandle {

    @Autowired private PartService partService;
    @Autowired private PartMapper partMapper;

    public ResponseEntity<Page<PartDTO>> searchParts(
            int page, int size,
            String search,
            Double priceFrom, Double priceTo,
            Integer stockFrom, Integer stockTo,
            Integer stockUnder, Integer stockAbove,
            String sortBy, String sortDir) {

        Sort sort = Sort.by(Sort.Direction.fromString(sortDir != null ? sortDir : "asc"),
                sortBy != null && !sortBy.isBlank() ? sortBy : "maPT");

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Part> result = partService.searchParts(
                search, priceFrom, priceTo,
                stockFrom, stockTo, stockUnder, stockAbove,
                pageable);

        Page<PartDTO> dtoPage = result.map(partMapper::toPartDTO);
        return ResponseEntity.ok(dtoPage);
    }

    public ResponseEntity<Page<PartDTO>> getAllParts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("maPT").ascending());
        Page<Part> parts = partService.getAllParts(pageable);
        Page<PartDTO> dtoPage = parts.map(partMapper::toPartDTO);
        return ResponseEntity.ok(dtoPage);
    }

    public ResponseEntity<PartDTO> getPartById(String maPT) {
        Part part = partService.getPartById(maPT);
        return ResponseEntity.ok(partMapper.toPartDTO(part));
    }

    public ResponseEntity<PartDTO> createPart(PartDTO dto) {
        Part part = partMapper.toEntity(dto);
        Part saved = partService.createPart(part);
        return ResponseEntity.status(HttpStatus.CREATED).body(partMapper.toPartDTO(saved));
    }

    public ResponseEntity<PartDTO> updatePart(String maPT, PartDTO dto) {
        if (!maPT.equals(dto.getMaPT())) {
            return ResponseEntity.badRequest().build();
        }
        Part part = partMapper.toEntity(dto);
        Part updated = partService.updatePart(maPT, part);
        return ResponseEntity.ok(partMapper.toPartDTO(updated));
    }

    public ResponseEntity<Void> deletePart(String maPT) {
        partService.deletePart(maPT);
        return ResponseEntity.noContent().build();
    }
}