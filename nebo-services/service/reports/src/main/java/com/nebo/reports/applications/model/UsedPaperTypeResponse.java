package com.nebo.reports.applications.model;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
public class UsedPaperTypeResponse {
    private long totalUsed;
    private Instant date;
}
