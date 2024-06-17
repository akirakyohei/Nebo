package com.nebo.template.applications.model.template;

import com.fasterxml.jackson.annotation.JsonRootName;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Setter
@Getter
@JsonRootName("template_app_permission")
public class TemplateAppPermissionRequest {
    private long appId;

    @Size(max = 500)
    private List<Long> templateIds;

}
