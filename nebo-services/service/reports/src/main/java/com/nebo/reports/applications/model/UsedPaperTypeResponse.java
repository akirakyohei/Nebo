package com.nebo.reports.applications.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UsedPaperTypeResponse {
    private long totalUsed;
    private Instant date;
}
