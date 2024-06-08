package com.nebo.template.applications.model.template;

import com.fasterxml.jackson.annotation.JsonRootName;


import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Setter
@Getter
@JsonRootName("template_app_permission")
public class TemplateAppPermission {
    private long id;

    private long userId;
    private long appId;

    private List<Long> templateIds;

    private Instant createdAt;

    private Instant updatedAt;
}
