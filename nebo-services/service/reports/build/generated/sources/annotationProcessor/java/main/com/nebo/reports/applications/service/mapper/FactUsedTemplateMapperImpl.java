package com.nebo.reports.applications.service.mapper;

import com.nebo.reports.applications.model.UsedTemplateResponse;
import com.nebo.reports.insfrastructures.domain.dto.UsedTemplateDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-28T22:48:02+0700",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.6.jar, environment: Java 17.0.6 (Oracle Corporation)"
)
@Component
public class FactUsedTemplateMapperImpl implements FactUsedTemplateMapper {

    @Override
    public UsedTemplateResponse fromDtoToResponse(UsedTemplateDto dto) {
        if ( dto == null ) {
            return null;
        }

        UsedTemplateResponse usedTemplateResponse = new UsedTemplateResponse();

        usedTemplateResponse.setTotalUsed( dto.getTotalUsed() );
        usedTemplateResponse.setDate( dto.getDate() );

        return usedTemplateResponse;
    }
}
