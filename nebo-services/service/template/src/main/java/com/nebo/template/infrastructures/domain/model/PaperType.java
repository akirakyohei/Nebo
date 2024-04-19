package com.nebo.template.infrastructures.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Table(name = "paper_types")
@Entity
public class PaperType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private long width;
    private String unitOfWidth;
    private long height;
    private String unitOfHeight;
    private String description;
}
