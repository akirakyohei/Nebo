package com.nebo.reports.applications.model;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
public class TemplateResponse {
    private long templateId;
    private String name;
    private Instant createdOn;
    private Instant updatedOn;
}
