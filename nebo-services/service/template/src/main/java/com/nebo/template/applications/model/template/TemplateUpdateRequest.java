package com.nebo.template.applications.model.template;

import com.fasterxml.jackson.annotation.JsonRootName;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;


@Setter
@Getter
@JsonRootName("template")
public class TemplateUpdateRequest {
    @Size(max=255)
    private String name;
    private List<Integer> categoryIds;
    private Integer paperTypeId;
    private List<Object> assets;
    private List<Object> components;
    @Size(max=65535)
    private String css;
    private List<Object> styles;
    @Size(max=65535)
    private String html;
    private Map<String, Object> fieldSchema;
    private Map<String, Object> testData;
    private TemplateOptionRequest options;
    private Boolean active;
}
