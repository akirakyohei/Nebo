package com.nebo.template.applications.model.category;

import com.fasterxml.jackson.annotation.JsonRootName;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonRootName("category")
public class CategoryCreateRequest {
    @NotBlank
    @Size(max = 255)
    private String name;
}
