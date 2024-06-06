package com.nebo.reports.infrastructures.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TopUsedTemplateDto {
    private long templateKey;
    private long totalUsed;
}
