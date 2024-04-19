package com.nebo.template.applications.model.template;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;


@Setter
@Getter
public class TemplateUpdateRequest {
    private String name;
    private List<Integer> categoryIds;
    private Map<String, Object> data;
    private Map<String, Object> params;
}
