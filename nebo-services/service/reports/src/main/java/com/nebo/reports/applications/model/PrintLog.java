package com.nebo.reports.applications.model;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
public class PrintLog {
    private long id;

    private long userId;

    private long templateId;

    private long paperTypeId;

    private Instant createdAt;
}
