package com.nebo.template.applications.model.template;

import com.nebo.persistences.ListIntegerConverter;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.Convert;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.util.List;
import java.util.Map;

@Setter
@Getter
public class TemplateCreateRequest {
    @NotBlank
    private String name;
    private int paperTypeId;
    private List<Integer> categoryIds;
    @NotNull
    private Map<String, Object> data;
    @NotNull
    private Map<String, Object> params;
}
