package DACNTT.garage.mapper;

import DACNTT.garage.dto.RepairDTO;
import DACNTT.garage.model.Repair;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RepairMapper {
    @Mapping(source = "lichHen.maLich", target = "maLich")
    @Mapping(source = "nhanVien.maNV", target = "maNV")
    RepairDTO toRepairDTO(Repair repair);
}
