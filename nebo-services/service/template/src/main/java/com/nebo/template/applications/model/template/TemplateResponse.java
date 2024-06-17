package com.nebo.template.applications.model.template;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.template.domain.model.Template;
import lombok.Getter;
import lombok.Setter;


import java.time.Instant;
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
    private Template.SharedStatus sharedStatus;

    private TemplateOptionResponse options;
    private boolean active;
    private boolean trashed;
    private ImageResponse thumbnail;
    private long size;
    private Instant createdAt;
    private Instant updatedAt;
}
