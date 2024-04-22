package com.nebo.reports.applications.service.mapper;

import com.nebo.reports.applications.model.UsedTemplateResponse;
import com.nebo.reports.insfrastructures.domain.dto.UsedTemplateDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FactUsedTemplateMapper {

    UsedTemplateResponse fromDtoToResponse(UsedTemplateDto dto);
}
