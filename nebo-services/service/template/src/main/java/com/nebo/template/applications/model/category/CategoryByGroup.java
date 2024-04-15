package com.nebo.template.applications.model.category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryByGroup {
    private int groupId;
    private List<CategoryResponse> categories;
}
