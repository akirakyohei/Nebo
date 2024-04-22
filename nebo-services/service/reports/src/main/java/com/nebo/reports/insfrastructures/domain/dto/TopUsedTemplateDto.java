package com.nebo.reports.insfrastructures.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TopUsedTemplateDto {
    private long templateKey;
    private long totalUsed;
}
