package com.nebo.template.applications.model.category;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
@JsonRootName("category")
public class CategoryResponse {
    private int id;
    private String name;
    private int groupId;
    private Instant createdAt;
    private Instant updatedAt;
}
