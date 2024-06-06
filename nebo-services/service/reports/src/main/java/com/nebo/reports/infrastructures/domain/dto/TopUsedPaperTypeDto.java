package com.nebo.reports.infrastructures.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TopUsedPaperTypeDto {
    private long totalUsed;
    private int paperTypeKey;
}
