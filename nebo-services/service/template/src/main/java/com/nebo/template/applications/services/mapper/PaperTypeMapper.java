package com.nebo.template.applications.services.mapper;

import com.nebo.template.domain.model.PaperType;
import com.nebo.template.applications.model.papertype.PaperTypeResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PaperTypeMapper {
    PaperTypeResponse fromDomainToResponse(PaperType paperType);
}
