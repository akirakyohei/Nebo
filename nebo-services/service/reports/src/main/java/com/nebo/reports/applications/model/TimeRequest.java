package com.nebo.reports.applications.model;

import com.nebo.shared.web.applications.bind.ParamName;
import com.nebo.shared.web.applications.bind.SupportParamName;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
@SupportParamName
public class TimeRequest {
    private Unit unit = Unit.day;

    @NotNull
    @ParamName("from_date")
    private Instant fromDate;
    @NotNull
    @ParamName("to_date")
    private Instant toDate;

    public enum Unit {
        hour, day, month, year;
    }
}
