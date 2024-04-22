package com.nebo.reports.applications.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PaperTypeResponse {
    private long paperTypeId;
    private String name;
    private long width;
    private String unitOfWidth;
    private String unitOfHeight;
    private long height;
    private String description;
}
