package com.nebo.reports.applications.model;

import lombok.Data;

import java.time.Instant;

@Data
public class HistorySessionResponse {
    private long id;
    private String ipAddress;
    private String userAgent;
    private Instant createdOn;
}
