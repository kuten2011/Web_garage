package DACNTT.garage.mapper;

import DACNTT.garage.dto.RepairPartDTO;
import DACNTT.garage.model.RepairPart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

// src/main/java/DACNTT/garage/mapper/RepairPartMapper.java
@Mapper(componentModel = "spring")
public interface RepairPartMapper {
    @Mapping(source = "phieu.maPhieu", target = "maPhieu")
    @Mapping(source = "phuTung.maPT", target = "maPT")
    @Mapping(source = "phuTung.tenPT", target = "tenPT")
    @Mapping(source = "phuTung.donGia", target = "donGia")
    RepairPartDTO toRepairPartDTO(RepairPart repairPart);
}