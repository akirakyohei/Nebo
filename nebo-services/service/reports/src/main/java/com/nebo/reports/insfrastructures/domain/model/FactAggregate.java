package com.nebo.reports.insfrastructures.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Table(name = "fact_aggregates")
@Entity
public class FactAggregate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long userKey;
    private long totalData;
    private long totalTemplate;
    private long totalUsedTemplate;

    public FactAggregate(long userKey) {
        this.userKey = userKey;
        this.totalData = 0;
        this.totalTemplate = 0;
        this.totalUsedTemplate = 0;
    }

    public static FactAggregate getDefault(long userKey) {
        return new FactAggregate(userKey);
    }
}
