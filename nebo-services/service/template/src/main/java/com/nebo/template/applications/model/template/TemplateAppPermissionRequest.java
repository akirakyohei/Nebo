package com.nebo.template.applications.model.template;

import com.fasterxml.jackson.annotation.JsonRootName;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Setter
@Getter
@JsonRootName("template_app_permissions")
public class TemplateAppPermissionRequest {
    private long appId;

    @Size(max = 500)
    private List<Long> templateIds;

}
