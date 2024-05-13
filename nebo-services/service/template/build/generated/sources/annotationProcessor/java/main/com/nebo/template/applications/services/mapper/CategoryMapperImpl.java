package com.nebo.template.applications.services.mapper;

import com.nebo.template.applications.model.category.CategoryCreateRequest;
import com.nebo.template.applications.model.category.CategoryResponse;
import com.nebo.template.applications.model.category.CategoryUpdateRequest;
import com.nebo.template.infrastructures.domain.model.Category;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-08T21:46:14+0700",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.6.jar, environment: Java 17.0.6 (Oracle Corporation)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Autowired
    private OptionalMapper optionalMapper;

    @Override
    public CategoryResponse fromDomainToResponse(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryResponse categoryResponse = new CategoryResponse();

        categoryResponse.setId( category.getId() );
        categoryResponse.setName( category.getName() );
        categoryResponse.setGroupId( category.getGroupId() );
        categoryResponse.setCreatedOn( category.getCreatedOn() );
        categoryResponse.setUpdatedOn( category.getUpdatedOn() );

        return categoryResponse;
    }

    @Override
    public Category fromRequestToDomain(CategoryCreateRequest request) {
        if ( request == null ) {
            return null;
        }

        Category.CategoryBuilder category = Category.builder();

        category.groupId( request.getGroupId() );
        category.name( request.getName() );

        return category.build();
    }

    @Override
    public void updateCategory(CategoryUpdateRequest request, Category category) {
        if ( request == null ) {
            return;
        }

        if ( request.getName() != null ) {
            category.setName( optionalMapper.fromOptional( request.getName() ) );
        }
        if ( request.getGroupId() != null ) {
            category.setGroupId( optionalMapper.fromOptional( request.getGroupId() ) );
        }
    }
}
