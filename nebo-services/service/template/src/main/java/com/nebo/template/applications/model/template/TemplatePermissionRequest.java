package com.nebo.template.applications.model.template;


import com.nebo.template.infrastructures.domain.model.Template;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Set;

@Setter
@Getter
@Validated
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
        private Set<TemplateUserPermission> permissions;
    }

}
