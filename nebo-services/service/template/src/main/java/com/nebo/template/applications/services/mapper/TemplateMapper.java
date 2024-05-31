package com.nebo.template.applications.services.mapper;

import com.nebo.template.applications.model.template.*;
import com.nebo.template.infrastructures.domain.model.FileData;
import com.nebo.template.infrastructures.domain.model.Template;
import com.nebo.template.infrastructures.domain.model.TemplateOption;
import org.mapstruct.*;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = true))
public interface TemplateMapper {
    Template fromRequestToDomain(TemplateCreateRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateTemplate(TemplateUpdateRequest request, @MappingTarget Template template);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateRequestToDomain(TemplateOptionRequest request, @MappingTarget TemplateOption templateOption);

    TemplateResponse fromDomainToResponse(Template template);

    TemplateOptionResponse fromDomainToResponse(TemplateOption option);

    @Mapping(source = "fileName", target = "name")
    @Mapping(source = "key", target = "url")
    ImageResponse fromDomainToResponse(FileData fileData);
}
