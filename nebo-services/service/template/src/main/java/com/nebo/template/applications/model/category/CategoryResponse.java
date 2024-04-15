package com.nebo.template.applications.model.category;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Setter
@Getter
public class CategoryResponse {
    private int id;
    private String name;
    private int groupId;
    private Timestamp createdOn;
    private Timestamp updatedOn;
}
