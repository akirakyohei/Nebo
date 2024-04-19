package com.nebo.template.applications.model.template;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.Map;

public class TemplateResponse {
    private long id;
    private String name;
    private int paperTypeId;
    private List<Integer> categoryIds;
    private Map<String, Object> data;
    private Map<String, Object> params;
}
