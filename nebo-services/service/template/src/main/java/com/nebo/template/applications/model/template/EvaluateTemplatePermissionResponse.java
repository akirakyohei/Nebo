package com.nebo.template.applications.model.template;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class EvaluateTemplatePermissionResponse {
    private long templateId;
    private long ownerUserId;
    private List<UserPermission> permissions;

    public EvaluateTemplatePermissionResponse(long templateId, long ownerUserId) {
        this.templateId = templateId;
        this.ownerUserId = ownerUserId;
    }
}
