package com.nebo.reports.infrastructures.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Table(name = "dim_paper_types")
@Entity
public class DimPaperType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paperTypeKey;
    private long paperTypeId;
    private String name;
    private long width;
    private String unitOfWidth;
    private String unitOfHeight;
    private long height;
    private String description;
}
