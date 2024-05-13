package com.nebo.reports.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonRootName("aggregate_report")
public class AggregateReportResponse {
    private long totalData;
    private long totalTemplate;
    private long totalUsedTemplate;
}
