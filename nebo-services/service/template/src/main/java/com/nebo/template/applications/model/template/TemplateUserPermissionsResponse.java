package com.nebo.template.applications.model.template;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.template.domain.model.UserPermission;
import com.nebo.shared.common.types.PageResponse;
import org.springframework.data.domain.Page;

@JsonRootName("template_user_permissions")
public class TemplateUserPermissionsResponse extends PageResponse<TemplateUserPermission> {
    public TemplateUserPermissionsResponse(Page<TemplateUserPermission> page) {
        super(page);
    }
}
