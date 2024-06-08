package com.nebo.reports.applications.service.mapper;

import com.nebo.reports.applications.model.UsedPaperTypeResponse;
import com.nebo.reports.domain.dto.UsedPaperTypeDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FactUsedPaperTypeMapper {
    UsedPaperTypeResponse fromDtoToResponse(UsedPaperTypeDto dto);
}
