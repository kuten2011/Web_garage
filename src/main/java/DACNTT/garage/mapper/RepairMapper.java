package DACNTT.garage.mapper;

import DACNTT.garage.dto.RepairDTO;
import DACNTT.garage.model.Repair;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RepairMapper {

    @Mapping(source = "lichHen.maLich", target = "maLich")
    @Mapping(source = "nhanVien.maNV", target = "maNV")
    @Mapping(target = "khachHang", source = "lichHen.khachHang")
    @Mapping(target = "xe", source = "lichHen.xe")
    RepairDTO toRepairDTO(Repair repair);

    @Mapping(source = "maLich", target = "lichHen.maLich")
    @Mapping(source = "maNV", target = "nhanVien.maNV")
    Repair toRepair(RepairDTO dto);

    // Optional: Để update entity từ DTO
    @Mapping(target = "lichHen", ignore = true)
    @Mapping(target = "nhanVien", ignore = true)
    void updateRepairFromDTO(RepairDTO dto, @MappingTarget Repair repair);
}