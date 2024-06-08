package com.nebo.template.domain.model;

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
    private Long width;
    private String unitOfWidth;
    private Long height;
    private String unitOfHeight;
    private String description;
}
