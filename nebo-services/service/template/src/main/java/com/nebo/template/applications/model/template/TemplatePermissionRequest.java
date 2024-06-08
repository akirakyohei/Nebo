package com.nebo.template.applications.model.template;


import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.template.domain.model.Template;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Set;

@Setter
@Getter
@Validated
@JsonRootName("template_user_permission")
public class TemplatePermissionRequest {
    private Long templateId;
    private Template.SharedStatus sharedStatus;

    @Size(max = 250)
    private List<UserPermissionRequest> putUsers;
    @Size(max = 250)
    private List<Long> removeUsers;

    @Setter
    @Getter
    public static class UserPermissionRequest {
        private long userId;
        private Set<UserPermission> permissions;
    }

}
