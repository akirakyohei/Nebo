package com.nebo.template.applications.services;

import com.nebo.template.applications.model.template.*;
import com.nebo.template.applications.services.mapper.TemplateMapper;
import com.nebo.template.infrastructures.domain.Specifiaction.TemplateSpecification;
import com.nebo.template.infrastructures.domain.model.Category_;
import com.nebo.template.infrastructures.domain.repository.JpaCategoryRepository;
import com.nebo.template.infrastructures.domain.repository.JpaTemplateRepository;
import com.nebo.web.applications.exception.ConstraintViolationException;
import com.nebo.web.applications.exception.NotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TemplateService {

    @Value("${nebo.default-user-id}")
    private Integer defaultUserId;

    private final JpaTemplateRepository templateRepository;

    private final JpaCategoryRepository categoryRepository;

    private final TemplateMapper templateMapper;


    @Transactional
    public TemplateResponse createTemplate(long userId, TemplateCreateRequest request) throws ConstraintViolationException {
        validateTemplateRequest(userId, request);
        var template = templateMapper.fromRequestToDomain(request);
        template.setUserId(userId);
        template = templateRepository.save(template);
        return templateMapper.fromDomainToResponse(template);
    }

    @Transactional
    public TemplateResponse updateTemplate(long userId, long templateId, TemplateUpdateRequest request) throws ConstraintViolationException {
        validateTemplateRequest(userId, request);
        var template = templateRepository.findTemplateByUserIdAndId(userId, templateId)
                .orElseThrow(NotFoundException::new);
        templateMapper.updateTemplate(request, template);
        template = templateRepository.save(template);
        return templateMapper.fromDomainToResponse(template);
    }

    public TemplateResponse getTemplate(long userId, long templateId) {
        var template = templateRepository.findTemplateByUserIdAndId(userId, templateId)
                .orElseThrow(NotFoundException::new);
        return templateMapper.fromDomainToResponse(template);
    }

    public TemplateResponse getDefaultTemplate(long templateId) {
        return getTemplate(defaultUserId, templateId);
    }

    public TemplatesResponse getTemplates(long userId, TemplateFilterRequest request) {
        var pageable = request.toPageable(Sort.by(Sort.Direction.DESC, Category_.CREATED_ON));
        var spec = TemplateSpecification.toFilter(userId, request);
        var page = templateRepository.findAll(spec, pageable);
        return TemplatesResponse.build(page.map(templateMapper::fromDomainToResponse));
    }

    public TemplatesResponse getDefaultTemplates(TemplateFilterRequest request) {
        return getTemplates(defaultUserId, request);
    }


    @Transactional
    public void deleteTemplate(long userId, int categoryId) {
        var category = categoryRepository.findCategoryByUserIdAndId(userId, categoryId)
                .orElseThrow(NotFoundException::new);
        categoryRepository.delete(category);
    }


    private void validateTemplateRequest(long userId, TemplateCreateRequest request) throws ConstraintViolationException {
        validateCategoryIds(userId, request.getCategoryIds());
    }

    private void validateTemplateRequest(long userId, TemplateUpdateRequest request) throws ConstraintViolationException {
        validateCategoryIds(userId, request.getCategoryIds());
    }

    private void validateCategoryIds(long userId, List<Integer> categoryIds) throws ConstraintViolationException {
        if (categoryIds != null) {
            var categories = categoryRepository.findAllByUserIdAndIdIn(userId, categoryIds);
            var notFoundCategoryIds = categoryIds.stream().filter(categoryId ->
                    categories.stream().filter(item -> Objects.equals(categoryId, item.getId())).findFirst().isEmpty()
            ).toList();
            if (!CollectionUtils.isEmpty(notFoundCategoryIds))
                throw new ConstraintViolationException("category_ids", String.format("%s not found", StringUtils.join(notFoundCategoryIds, ",")));
        }
    }


}



