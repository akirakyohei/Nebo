package com.nebo.reports.applications.service.mapper;

import com.nebo.reports.applications.model.AggregateReportResponse;
import com.nebo.reports.insfrastructures.domain.model.FactAggregate;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FactAggregateMapper {
    AggregateReportResponse fromDomainToResponse(FactAggregate factAggregate);
}
