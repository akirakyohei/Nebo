package com.nebo.template.applications.model.template;

import com.nebo.shared.common.types.PagingFilterRequest;
import com.nebo.shared.web.applications.bind.ParamName;
import com.nebo.shared.web.applications.bind.SupportParamName;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@SupportParamName
public class TemplateFilterRequest extends PagingFilterRequest {
    private String query;

    private List<Long> ids;

    @ParamName("category_ids")
    private List<Long> categoryIds;

    @ParamName("shared")
    private Boolean shared;

    private Boolean active;

    @ParamName("sort_direction")
    private String sortDirection;

    @ParamName("sort_by")
    private String sortBy;
}
