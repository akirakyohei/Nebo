package com.nebo.reports.applications.service.mapper;

import com.nebo.reports.applications.model.HistorySessionResponse;
import com.nebo.reports.applications.model.Session;
import com.nebo.reports.insfrastructures.domain.model.FactSession;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FactSessionMapper {

    @Mapping(source = "id", target = "id", ignore = true)
    FactSession fromModelToDomain(Session session);

    HistorySessionResponse fromDomainToResponse(FactSession session);
}
