package com.nebo.reports.insfrastructures.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Setter
@Getter
@Table(name = "dim_templates")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DimTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long templateKey;
    private long templateId;
    private String name;
    private long userKey;
    private int paperTypeKey;
    private Instant createdOn;
    private Instant updatedOn;
}
