package com.nebo.reports.applications.service.mapper;

import com.nebo.reports.applications.model.UsedPaperTypeResponse;
import com.nebo.reports.applications.model.UsedTemplateResponse;
import com.nebo.reports.insfrastructures.domain.dto.UsedPaperTypeDto;
import com.nebo.reports.insfrastructures.domain.dto.UsedTemplateDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FactUsedPaperTypeMapper {
    UsedPaperTypeResponse fromDtoToResponse(UsedPaperTypeDto dto);
}
