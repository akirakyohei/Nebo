package com.nebo.template.applications.services.mapper;

import com.nebo.template.applications.model.papertype.PaperTypeResponse;
import com.nebo.template.infrastructures.domain.model.PaperType;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-08T21:46:14+0700",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.6.jar, environment: Java 17.0.6 (Oracle Corporation)"
)
@Component
public class PaperTypeMapperImpl implements PaperTypeMapper {

    @Override
    public PaperTypeResponse fromDomainToResponse(PaperType paperType) {
        if ( paperType == null ) {
            return null;
        }

        PaperTypeResponse paperTypeResponse = new PaperTypeResponse();

        paperTypeResponse.setId( paperType.getId() );
        paperTypeResponse.setName( paperType.getName() );
        paperTypeResponse.setWidth( paperType.getWidth() );
        paperTypeResponse.setUnitOfWidth( paperType.getUnitOfWidth() );
        paperTypeResponse.setUnitOfHeight( paperType.getUnitOfHeight() );
        paperTypeResponse.setHeight( paperType.getHeight() );
        paperTypeResponse.setDescription( paperType.getDescription() );

        return paperTypeResponse;
    }
}
