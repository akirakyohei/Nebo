package com.nebo.reports.applications.model;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Setter
@Getter
public class Template {
    private long id;
    private long userId;
    private String name;
    private int paperTypeId;
    private List<Integer> categoryIds;
    private long size;
    private Instant createdAt;
    private Instant updatedAt;
}
