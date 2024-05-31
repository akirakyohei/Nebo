package com.nebo.reports.applications.service.mapper;

import com.nebo.reports.applications.model.PaperTypeResponse;
import com.nebo.reports.insfrastructures.domain.model.DimPaperType;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-28T22:48:02+0700",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.6.jar, environment: Java 17.0.6 (Oracle Corporation)"
)
@Component
public class DimPaperTypeMapperImpl implements DimPaperTypeMapper {

    @Override
    public PaperTypeResponse fromDomainToResponse(DimPaperType dimPaperType) {
        if ( dimPaperType == null ) {
            return null;
        }

        PaperTypeResponse paperTypeResponse = new PaperTypeResponse();

        paperTypeResponse.setPaperTypeId( dimPaperType.getPaperTypeId() );
        paperTypeResponse.setName( dimPaperType.getName() );
        paperTypeResponse.setWidth( dimPaperType.getWidth() );
        paperTypeResponse.setUnitOfWidth( dimPaperType.getUnitOfWidth() );
        paperTypeResponse.setUnitOfHeight( dimPaperType.getUnitOfHeight() );
        paperTypeResponse.setHeight( dimPaperType.getHeight() );
        paperTypeResponse.setDescription( dimPaperType.getDescription() );

        return paperTypeResponse;
    }
}
