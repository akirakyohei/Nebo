package com.nebo.template.applications.services;

import com.nebo.template.applications.model.category.*;
import com.nebo.template.applications.services.mapper.CategoryMapper;
import com.nebo.template.infrastructures.domain.Specifiaction.CategorySpecification;
import com.nebo.template.infrastructures.domain.model.Category_;
import com.nebo.template.infrastructures.domain.repository.JpaCategoryRepository;
import com.nebo.template.infrastructures.util.CategoryGroupUtils;
import com.nebo.web.applications.exception.ConstraintViolationException;
import com.nebo.web.applications.exception.NotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {
    @Value("${nebo.default-user-id}")
    private final Integer defaultUserId;

    private final JpaCategoryRepository categoryRepository;

    private final CategoryMapper categoryMapper;

    private final List<CategoryGroup> categoryGroups = CategoryGroupUtils.loadData();

    public List<CategoryByGroup> getCategoryByGroups(long userId) {
        var categories = categoryRepository.findAllByUserId(userId);
        return categoryGroups.stream().map(group -> new CategoryByGroup(group.getId(), categories.stream().filter(item -> Objects.equals(item.getGroupId(), group.getId()))
                .map(categoryMapper::fromDomainToResponse)
                .toList())).toList();
    }

    @Transactional
    public CategoryResponse createCategory(long userId, CategoryCreateRequest request) throws ConstraintViolationException {
        if (categoryGroups.stream().filter(item -> Objects.equals(item.getId(), request.getGroupId())).findFirst().isEmpty())
            throw new ConstraintViolationException("group_id", "GroupId not found");
        var category = categoryMapper.fromRequestToDomain(request);
        category.setUserId(userId);
        category = categoryRepository.save(category);
        return categoryMapper.fromDomainToResponse(category);
    }

    @Transactional
    public CategoryResponse updateCategory(long userId, int categoryId, CategoryUpdateRequest request) throws ConstraintViolationException {
        if (request.getGroupId() != null && request.getGroupId().isPresent() && categoryGroups.stream().filter(item -> Objects.equals(item.getId(), request.getGroupId().get())).findFirst().isEmpty())
            throw new ConstraintViolationException("group_id", "GroupId not found");
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
        var pageable = request.toPageable(Sort.by(Sort.Direction.DESC, Category_.CREATED_ON));
        var spec = CategorySpecification.toFilter(userId, request);
        var page = categoryRepository.findAll(spec, pageable);
        return CategoriesResponse.build(page.map(categoryMapper::fromDomainToResponse));
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
