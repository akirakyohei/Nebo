package com.nebo.reports.insfrastructures.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TopUsedPaperTypeDto {
    private long totalUsed;
    private int paperTypeKey;
}
