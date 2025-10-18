package DACNTT.garage.mapper;

import DACNTT.garage.dto.FeedbackDTO;
import DACNTT.garage.model.Feedback;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FeedbackMapper {
    @Mapping(source = "khachHang.maKH", target = "maKH")
    @Mapping(source = "nhanVienXuLy.maNV", target = "maNVXL")
    FeedbackDTO toFeedbackDTO(Feedback feedback);
}
