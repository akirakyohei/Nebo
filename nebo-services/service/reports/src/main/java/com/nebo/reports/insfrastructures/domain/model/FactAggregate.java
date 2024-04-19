package com.nebo.reports.insfrastructures.domain.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Table(name = "fact_aggregates")
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
}
