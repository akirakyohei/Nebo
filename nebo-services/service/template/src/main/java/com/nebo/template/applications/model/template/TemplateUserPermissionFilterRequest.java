package com.nebo.template.applications.model.template;

import com.nebo.shared.common.types.PagingFilterRequest;
import com.nebo.shared.web.applications.bind.ParamName;
import com.nebo.shared.web.applications.bind.SupportParamName;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@SupportParamName
public class TemplateUserPermissionFilterRequest extends PagingFilterRequest {
    private String query;

    @ParamName("shared_user_ids")
    private List<Long> sharedUserIds;
}
