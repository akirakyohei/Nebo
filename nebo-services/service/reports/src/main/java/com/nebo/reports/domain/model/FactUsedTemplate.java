package com.nebo.reports.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Table(name = "fact_used_templates")
@Entity
@NoArgsConstructor
public class FactUsedTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long userKey;
    private long templateKey;
    private long dateKey;
    private long totalUsed;


    public FactUsedTemplate(long userKey, long dateKey, long templateKey) {
        this.userKey = userKey;
        this.templateKey = templateKey;
        this.dateKey = dateKey;
        this.totalUsed = 0;
    }
}
