package com.nebo.reports.applications.service.mapper;

import com.nebo.reports.applications.model.PaperTypeResponse;
import com.nebo.reports.insfrastructures.domain.model.DimPaperType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DimPaperTypeMapper {

    PaperTypeResponse fromDomainToResponse(DimPaperType dimPaperType);
}
