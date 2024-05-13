package com.nebo.reports.insfrastructures.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Setter
@Getter
@Table(name = "dim_datetimes")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DimDatetime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long dateKey;
    private Instant date;
    private int hour;
    private int dayOfMonth;
    private String dayOfWeek;
    private int dayOfYear;
    private Instant firstHourOfDay;
    private Instant firstDayOfMonth;
    private Instant firstDayOfWeek;
    private Instant firstDayOfYear;
    private int monthOfYear;
    private int year;
}
