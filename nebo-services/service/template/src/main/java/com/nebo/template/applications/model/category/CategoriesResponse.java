package com.nebo.template.applications.model.category;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.types.PageResponse;
import org.springframework.data.domain.Page;

@JsonRootName("categories")
public class CategoriesResponse extends PageResponse<CategoryResponse> {
    public CategoriesResponse(Page<CategoryResponse> page) {
        super(page);
    }
}
