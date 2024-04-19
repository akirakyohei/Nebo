package com.nebo.reports.applications.service.mapper;

import com.nebo.reports.applications.model.Template;
import com.nebo.reports.insfrastructures.domain.model.DimTemplate;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface DimTemplateMapper {

    void updateTemplate(Template template, @MappingTarget DimTemplate dimTemplate);
}
