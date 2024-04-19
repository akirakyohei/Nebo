package com.nebo.reports.insfrastructures.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Table(name = "fact_used_paper_types")
@Entity
public class FactUsedPaperType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long userKey;
    private int paperTypeKey;
    private long dateKey;
    private long totalUsed;

    public FactUsedPaperType(long userKey, long dateKey, int paperTypeKey) {
        this.userKey = userKey;
        this.paperTypeKey = paperTypeKey;
        this.dateKey = dateKey;
        this.totalUsed = 0;
    }
}