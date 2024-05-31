package com.nebo.reports.applications.service.mapper;

import com.nebo.reports.applications.model.Template;
import com.nebo.reports.applications.model.TemplateResponse;
import com.nebo.reports.insfrastructures.domain.model.DimTemplate;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-28T22:48:02+0700",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.6.jar, environment: Java 17.0.6 (Oracle Corporation)"
)
@Component
public class DimTemplateMapperImpl implements DimTemplateMapper {

    @Override
    public void updateTemplate(Template template, DimTemplate dimTemplate) {
        if ( template == null ) {
            return;
        }

        dimTemplate.setName( template.getName() );
        dimTemplate.setCreatedAt( template.getCreatedAt() );
        dimTemplate.setUpdatedAt( template.getUpdatedAt() );
    }

    @Override
    public TemplateResponse fromDomainToResponse(DimTemplate template) {
        if ( template == null ) {
            return null;
        }

        TemplateResponse templateResponse = new TemplateResponse();

        templateResponse.setTemplateId( template.getTemplateId() );
        templateResponse.setName( template.getName() );
        templateResponse.setCreatedAt( template.getCreatedAt() );
        templateResponse.setUpdatedAt( template.getUpdatedAt() );

        return templateResponse;
    }
}
