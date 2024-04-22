package com.nebo.reports.applications.service.mapper;

import com.nebo.reports.applications.model.HistorySessionResponse;
import com.nebo.reports.applications.model.Session;
import com.nebo.reports.insfrastructures.domain.model.FactSession;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-04-22T00:43:10+0700",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.6.jar, environment: Java 17.0.7 (Oracle Corporation)"
)
@Component
public class FactSessionMapperImpl implements FactSessionMapper {

    @Override
    public FactSession fromModelToDomain(Session session) {
        if ( session == null ) {
            return null;
        }

        FactSession factSession = new FactSession();

        factSession.setCreatedOn( session.getCreatedOn() );

        return factSession;
    }

    @Override
    public HistorySessionResponse fromDomainToResponse(FactSession session) {
        if ( session == null ) {
            return null;
        }

        HistorySessionResponse historySessionResponse = new HistorySessionResponse();

        historySessionResponse.setId( session.getId() );
        historySessionResponse.setIpAddress( session.getIpAddress() );
        historySessionResponse.setUserAgent( session.getUserAgent() );
        historySessionResponse.setCreatedOn( session.getCreatedOn() );

        return historySessionResponse;
    }
}
