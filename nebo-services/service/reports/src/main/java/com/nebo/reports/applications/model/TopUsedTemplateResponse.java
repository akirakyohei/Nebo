package com.nebo.reports.applications.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class TopUsedTemplateResponse {
    private long totalUsed;
    private TemplateResponse template;
}
