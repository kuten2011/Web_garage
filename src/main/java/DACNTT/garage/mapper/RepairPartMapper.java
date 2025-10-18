package DACNTT.garage.mapper;

import DACNTT.garage.dto.RepairPartDTO;
import DACNTT.garage.model.RepairPart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RepairPartMapper {
    @Mapping(source = "phieu.maPhieu", target = "maPhieu")
    @Mapping(source = "phuTung.maPT", target = "maPT")
    RepairPartDTO toRepairPartDTO(RepairPart repairPart);
}
