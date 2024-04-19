package com.nebo.reports.applications.model;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
public class StorageModel {
    private long userId;
    private long adjustTotalData;
    private Instant createdOn;
}
