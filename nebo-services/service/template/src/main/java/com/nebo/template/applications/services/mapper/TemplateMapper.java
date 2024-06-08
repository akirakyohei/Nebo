package com.nebo.template.applications.services.mapper;

import com.nebo.template.applications.model.template.*;
import com.nebo.template.domain.model.*;
import com.nebo.template.domain.model.UserPermission;
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

    TemplateUserPermission fromDomainToResponse(UserPermission userPermission);

    TemplateAppPermission fromDomainToResponse(AppPermission appPermission);

    @Mapping(source = "fileName", target = "name")
    @Mapping(source = "key", target = "url")
    ImageResponse fromDomainToResponse(FileData fileData);
}
