package com.nebo.reports.applications.service.mapper;

import com.nebo.reports.applications.model.UsedPaperTypeResponse;
import com.nebo.reports.insfrastructures.domain.dto.UsedPaperTypeDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-08T00:30:57+0700",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.6.jar, environment: Java 17.0.6 (Oracle Corporation)"
)
@Component
public class FactUsedPaperTypeMapperImpl implements FactUsedPaperTypeMapper {

    @Override
    public UsedPaperTypeResponse fromDtoToResponse(UsedPaperTypeDto dto) {
        if ( dto == null ) {
            return null;
        }

        UsedPaperTypeResponse usedPaperTypeResponse = new UsedPaperTypeResponse();

        usedPaperTypeResponse.setTotalUsed( dto.getTotalUsed() );
        usedPaperTypeResponse.setDate( dto.getDate() );

        return usedPaperTypeResponse;
    }
}
