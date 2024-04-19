package com.nebo.template.interfaces.rest;

import com.nebo.template.applications.model.template.*;
import com.nebo.template.applications.services.TemplateService;
import com.nebo.template.infrastructures.domain.Specifiaction.TemplateSpecification;
import com.nebo.template.infrastructures.domain.model.Category_;
import com.nebo.web.applications.bind.UserId;
import com.nebo.web.applications.exception.ConstraintViolationException;
import com.nebo.web.applications.exception.NotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/templates")
public class TemplateController {

    private final TemplateService templateService;

    @PostMapping
    public TemplateResponse createTemplate(@UserId long userId, @RequestBody @Valid TemplateCreateRequest request) throws ConstraintViolationException {
        return templateService.createTemplate(userId, request);
    }

    @PutMapping("/{id}")
    public TemplateResponse updateTemplate(@UserId long userId, @PathVariable("id") int templateId, @RequestBody @Valid TemplateUpdateRequest request) throws ConstraintViolationException {
        return templateService.updateTemplate(userId, templateId, request);
    }

    @GetMapping("/{id}")
    public TemplateResponse getTemplate(@UserId long userId, @PathVariable("id") int templateId) {
        return templateService.getTemplate(userId, templateId);
    }

    @GetMapping("/default/{id}")
    public TemplateResponse getDefaultTemplate(@PathVariable("id") int templateId) {
        return templateService.getDefaultTemplate(templateId);
    }

    @GetMapping
    public TemplatesResponse getTemplates(@UserId long userId, TemplateFilterRequest request) {
        return templateService.getTemplates(userId, request);
    }

    @GetMapping("default")
    public TemplatesResponse getDefaultTemplates(TemplateFilterRequest request) {
        return templateService.getDefaultTemplates(request);
    }


    @DeleteMapping("/{id}")
    public void deleteTemplate(@UserId long userId,@PathVariable("id") int templateId) {
        templateService.deleteTemplate(userId, templateId);
    }

    @PostMapping("/{id}/print")
    public void print(@UserId long userId,@PathVariable("id") int templateId){

    }


}
