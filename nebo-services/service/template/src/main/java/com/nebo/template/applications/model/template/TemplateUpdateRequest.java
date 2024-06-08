package com.nebo.template.applications.model.template;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;


@Setter
@Getter
@JsonRootName("template")
public class TemplateUpdateRequest {
    private String name;
    private List<Integer> categoryIds;
    private Integer paperTypeId;
    private List<String> assets;
    private List<Object> components;
    private String css;
    private List<Object> styles;
    private String html;
    private Map<String, Object> fieldSchema;
    private Map<String, Object> testData;
    private TemplateOptionRequest options;
    private Boolean active;
    private Boolean trashed;
}
