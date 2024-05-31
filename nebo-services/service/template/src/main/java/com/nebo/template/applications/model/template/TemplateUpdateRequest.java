package com.nebo.template.applications.model.template;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.template.infrastructures.domain.model.Template;
import com.nebo.template.infrastructures.domain.model.TemplateOption;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

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
