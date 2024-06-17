package com.nebo.reports.domain.model;

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
    private Long width;
    private String unitOfWidth;
    private String unitOfHeight;
    private Long height;
    private String description;
}
