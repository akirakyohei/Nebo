package com.nebo.template.applications.model.papertype;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PaperTypeResponse {
    private int id;
    private String name;
    private long width;
    private String unitOfWidth;
    private String unitOfHeight;
    private long height;
    private String description;
}
