package com.nebo.template.applications.services;

import com.nebo.shared.web.applications.exception.ConstraintViolationException;
import com.nebo.shared.web.applications.exception.NotFoundException;
import com.nebo.template.applications.services.mapper.CategoryMapper;
import com.nebo.template.domain.Specifiaction.CategorySpecification;
import com.nebo.template.domain.model.Category_;
import com.nebo.template.applications.model.category.*;
import com.nebo.template.domain.repository.JpaCategoryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {
    @Value("${nebo.default-user-id}")
    private Integer defaultUserId;

    private final JpaCategoryRepository categoryRepository;

    private final CategoryMapper categoryMapper;
    ;


    @Transactional
    public CategoryResponse createCategory(long userId, CategoryCreateRequest request) throws ConstraintViolationException {
        var category = categoryMapper.fromRequestToDomain(request);
        category.setUserId(userId);
        category = categoryRepository.save(category);
        return categoryMapper.fromDomainToResponse(category);
    }

    @Transactional
    public CategoryResponse updateCategory(long userId, int categoryId, CategoryUpdateRequest request) throws ConstraintViolationException {
        var category = categoryRepository.findCategoryByUserIdAndId(userId, categoryId)
                .orElseThrow(NotFoundException::new);
        categoryMapper.updateCategory(request, category);
        category = categoryRepository.save(category);
        return categoryMapper.fromDomainToResponse(category);
    }

    public CategoryResponse getCategory(long userId, int categoryId) {
        var category = categoryRepository.findCategoryByUserIdAndId(userId, categoryId)
                .orElseThrow(NotFoundException::new);
        return categoryMapper.fromDomainToResponse(category);
    }

    public CategoryResponse getDefaultCategory( int categoryId) {
        return getCategory(defaultUserId, categoryId);
    }

    public CategoriesResponse getCategories(long userId, CategoryFilterRequest request) {
        var pageable = request.toPageable(Sort.by(Sort.Direction.DESC, Category_.CREATED_AT));
        var spec = CategorySpecification.toFilter(userId, request);
        var page = categoryRepository.findAll(spec, pageable);
        return new CategoriesResponse(page.map(categoryMapper::fromDomainToResponse));
    }

    public CategoriesResponse getDefaultCategories(CategoryFilterRequest request) {
        return getCategories(defaultUserId, request);
    }

    @Transactional
    public void deleteCategory(long userId, int categoryId) {
        var category = categoryRepository.findCategoryByUserIdAndId(userId, categoryId)
                .orElseThrow(NotFoundException::new);
        categoryRepository.delete(category);
    }
}
