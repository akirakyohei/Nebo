package com.nebo.reports.applications.model;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
public class TimeRequest {
    private Unit unit;
    private Instant fromDate;
    private Instant toDate;

    public enum Unit {
        hour, day, month, year;
    }
}
