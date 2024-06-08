package com.nebo.template.applications.model.category;

import com.nebo.shared.common.types.PagingFilterRequest;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class CategoryFilterRequest extends PagingFilterRequest {
    private String query;
    private List<Long> ids;
}
