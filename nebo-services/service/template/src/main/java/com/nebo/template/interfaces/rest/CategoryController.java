package com.nebo.template.interfaces.rest;

import com.nebo.shared.web.applications.bind.UserId;
import com.nebo.shared.web.applications.exception.ConstraintViolationException;
import com.nebo.template.applications.services.CategoryService;
import com.nebo.template.applications.model.category.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public CategoryResponse createCategory(@UserId long userId, @RequestBody @Valid CategoryCreateRequest request) throws ConstraintViolationException {
        return categoryService.createCategory(userId, request);
    }

    @PutMapping("/{id}")
    public CategoryResponse updateCategory(@UserId long userId, @PathVariable("id") int categoryId, @RequestBody @Valid CategoryUpdateRequest request) throws ConstraintViolationException {
        return categoryService.updateCategory(userId, categoryId, request);
    }

    @GetMapping("/{id}")
    public CategoryResponse getCategory(@UserId long userId, @PathVariable("id") int categoryId) {
        return categoryService.getCategory(userId, categoryId);
    }

    @GetMapping("default/{id}")
    public CategoryResponse getDefaultCategory(@PathVariable("id") int categoryId) {
        return categoryService.getDefaultCategory(categoryId);
    }

    @GetMapping
    public CategoriesResponse getCategories(@UserId long userId, CategoryFilterRequest request) {
        return categoryService.getCategories(userId, request);
    }

    @GetMapping("/default")
    public CategoriesResponse getDefaultCategories(CategoryFilterRequest request) {
        return categoryService.getDefaultCategories(request);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@UserId long userId, @PathVariable("id") int categoryId) {
        categoryService.deleteCategory(userId, categoryId);
    }
}
