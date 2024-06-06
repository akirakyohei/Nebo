package com.nebo.template.applications.model.category;

import com.fasterxml.jackson.annotation.JsonRootName;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

@Setter
@Getter
@Validated
@JsonRootName("category")
public class CategoryUpdateRequest {
    private Optional<@NotBlank @Size(max = 255) String> name;

    public Optional<String> getName() {
        return name;
    }

    public void setName(Optional<String> name) {
        this.name = name;
    }
}
