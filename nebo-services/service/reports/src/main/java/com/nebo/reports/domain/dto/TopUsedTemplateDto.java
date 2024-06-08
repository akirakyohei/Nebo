package com.nebo.reports.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TopUsedTemplateDto {
    private long templateKey;
    private long totalUsed;
}
