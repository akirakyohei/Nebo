package com.nebo.template.applications.model.template;

import com.nebo.types.PagingFilterRequest;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TemplateFilterRequest extends PagingFilterRequest {
    private String query;
}
