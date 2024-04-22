package com.nebo.reports.applications.model;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
public class UsedTemplateResponse {
    private long totalUsed;
    private Instant date;
}
