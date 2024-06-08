package com.nebo.template.applications.services.mapper;

import com.nebo.template.domain.model.Category;
import com.nebo.template.applications.model.category.CategoryCreateRequest;
import com.nebo.template.applications.model.category.CategoryResponse;
import com.nebo.template.applications.model.category.CategoryUpdateRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", uses = {OptionalMapper.class})
public interface CategoryMapper {

    CategoryResponse fromDomainToResponse(Category category);

    Category fromRequestToDomain(CategoryCreateRequest request);

    @Mapping(source = "name", target = "name", qualifiedByName = "optional", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCategory(CategoryUpdateRequest request, @MappingTarget Category category);
}
