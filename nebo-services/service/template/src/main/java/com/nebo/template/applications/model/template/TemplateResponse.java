package com.nebo.template.applications.model.template;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.persistences.ListIntegerConverter;
import com.nebo.persistences.ListStringConverter;
import com.nebo.template.infrastructures.domain.model.TemplateOption;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Convert;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Setter
@Getter
@JsonRootName("template")
public class TemplateResponse {
    private long id;
    private long userId;
    private String name;
    private int paperTypeId;
    private List<Integer> categoryIds;
    private List<Object> assets;
    private Object components;
    private String css;
    private Object styles;
    private String html;
    private Map<String, Object> fieldSchema;
    private Map<String, Object> testData;

    private TemplateOptionResponse options;
    private boolean active;
    private boolean trashed;
    private ImageResponse thumbnail;
    private long size;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
