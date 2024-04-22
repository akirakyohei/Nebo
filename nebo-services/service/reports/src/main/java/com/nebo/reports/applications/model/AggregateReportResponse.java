package com.nebo.reports.applications.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AggregateReportResponse {
    private long totalData;
    private long totalTemplate;
    private long totalUsedTemplate;
}
