package com.nebo.template.applications.model.category;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

@Setter
@Getter
@Validated
public class CategoryUpdateRequest {
    private Optional<@NotBlank @Size(max = 255) String> name;
    private Optional<@NotNull Integer> groupId;
}
