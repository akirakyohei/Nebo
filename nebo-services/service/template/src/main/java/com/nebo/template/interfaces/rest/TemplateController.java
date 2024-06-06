package com.nebo.template.interfaces.rest;

import com.google.common.io.ByteStreams;
import com.nebo.template.applications.model.template.*;
import com.nebo.template.applications.services.TemplateService;
import com.nebo.web.applications.bind.UserId;
import com.nebo.web.applications.exception.ConstraintViolationException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.AccessDeniedException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/templates")
public class TemplateController {

    private final TemplateService templateService;

    @PostMapping
    public TemplateResponse createTemplate(@UserId long userId, @RequestBody @Valid TemplateCreateRequest request) throws ConstraintViolationException, IOException {
        return templateService.createTemplate(userId, request);
    }

    @PutMapping("/{id}")
    public TemplateResponse updateTemplate(@UserId long userId, @PathVariable("id") int templateId, @RequestBody @Valid TemplateUpdateRequest request) throws ConstraintViolationException, IOException {
        return templateService.updateTemplate(userId, templateId, request);
    }

    @GetMapping("/{id}")
    public TemplateResponse getTemplate(@UserId long userId, @PathVariable("id") int templateId) throws AccessDeniedException {
        return templateService.getTemplate(userId, templateId);
    }

    @GetMapping("/default/{id}")
    public TemplateResponse getDefaultTemplate(@PathVariable("id") int templateId) throws AccessDeniedException {
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
    public void deleteTemplate(@UserId long userId, @PathVariable("id") int templateId) {
        templateService.deleteTemplate(userId, templateId);
    }

    @PostMapping("/{id}/print")
    public void print(@UserId long userId, @PathVariable("id") long templateId, @RequestBody(required = false) TemplatePrintRequest request, HttpServletResponse httpServletResponse) throws IOException {
        var data = templateService.print(userId, templateId, request);
        String encodedOriginalName = URLEncoder.encode(data.getRight(), String.valueOf(StandardCharsets.UTF_8));
        httpServletResponse.addHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + encodedOriginalName + ".pdf");
        httpServletResponse.setCharacterEncoding("UTF-8");
        try (var input = new ByteArrayInputStream(data.getKey())) {
            ByteStreams.copy(input, httpServletResponse.getOutputStream());
            httpServletResponse.flushBuffer();
        }
    }

    @PostMapping("/{id}/share")
    public TemplateResponse share(@UserId long userId, @PathVariable("id") long templateId, @RequestBody TemplatePermissionRequest request) throws AccessDeniedException {
        return templateService.shareTemplate(userId, templateId, request);
    }


}
