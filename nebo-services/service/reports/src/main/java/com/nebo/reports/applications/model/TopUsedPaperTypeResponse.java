package com.nebo.reports.applications.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class TopUsedPaperTypeResponse {
    private long totalUsed;
    private PaperTypeResponse paperType;
}
