package com.nebo.reports.applications.service.mapper;

import com.nebo.reports.applications.model.AggregateReportResponse;
import com.nebo.reports.insfrastructures.domain.model.FactAggregate;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-08T00:30:58+0700",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.6.jar, environment: Java 17.0.6 (Oracle Corporation)"
)
@Component
public class FactAggregateMapperImpl implements FactAggregateMapper {

    @Override
    public AggregateReportResponse fromDomainToResponse(FactAggregate factAggregate) {
        if ( factAggregate == null ) {
            return null;
        }

        AggregateReportResponse aggregateReportResponse = new AggregateReportResponse();

        aggregateReportResponse.setTotalData( factAggregate.getTotalData() );
        aggregateReportResponse.setTotalTemplate( factAggregate.getTotalTemplate() );
        aggregateReportResponse.setTotalUsedTemplate( factAggregate.getTotalUsedTemplate() );

        return aggregateReportResponse;
    }
}
