package com.nebo.template.applications.model.category;

import com.nebo.types.PagingFilterRequest;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CategoryFilterRequest extends PagingFilterRequest {
    private String query;
}
