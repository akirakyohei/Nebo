package com.nebo.template.applications.services.mapper;

import com.nebo.template.applications.model.template.TemplateCreateRequest;
import com.nebo.template.applications.model.template.TemplateResponse;
import com.nebo.template.applications.model.template.TemplateUpdateRequest;
import com.nebo.template.infrastructures.domain.model.Template;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface TemplateMapper {
    Template fromRequestToDomain(TemplateCreateRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateTemplate(TemplateUpdateRequest request, @MappingTarget Template template);

    TemplateResponse fromDomainToResponse(Template template);

}
