package com.nebo.reports.domain.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.Instant;

@Getter
@Builder
public class UsedPaperTypeDto {
    private long totalUsed;
    private Instant date;
}
