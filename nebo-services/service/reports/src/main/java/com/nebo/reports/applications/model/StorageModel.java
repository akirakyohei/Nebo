package com.nebo.reports.applications.model;

import lombok.*;

import java.time.Instant;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StorageModel {
    private long userId;
    private long adjustTotalData;
}
