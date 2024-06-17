package com.nebo.template.interfaces.rest;

import com.google.common.io.ByteStreams;
import com.nebo.shared.web.applications.bind.UserId;
import com.nebo.shared.web.applications.exception.ConstraintViolationException;
import com.nebo.template.applications.services.TemplateService;
import com.nebo.template.applications.model.template.*;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Map;

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
    public TemplatesResponse getTemplates(@UserId long userId, TemplateFilterRequest request) throws ConstraintViolationException {
        return templateService.getTemplates(userId, request);
    }

    @GetMapping("default")
    public TemplatesResponse getDefaultTemplates(TemplateFilterRequest request) throws ConstraintViolationException {
        return templateService.getDefaultTemplates(request);
    }


    @DeleteMapping("/{id}")
    public void deleteTemplate(@UserId long userId, @PathVariable("id") int templateId) {
        templateService.deleteTemplate(userId, templateId);
    }

    @PostMapping("/preview")
    public ResponseEntity preview(@UserId long userId, @RequestBody @Valid TemplatePreviewRequest request, HttpServletResponse httpServletResponse) throws IOException {
        if (TemplatePreviewRequest.Format.pdf.equals(request.getFormat())) {
            var data = templateService.preview(userId, request);
            String encodedOriginalName = URLEncoder.encode(data.getRight(), String.valueOf(StandardCharsets.UTF_8));
            httpServletResponse.addHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + encodedOriginalName + ".pdf");
            httpServletResponse.setCharacterEncoding("UTF-8");
            try (var input = new ByteArrayInputStream(data.getKey())) {
                ByteStreams.copy(input, httpServletResponse.getOutputStream());
                httpServletResponse.flushBuffer();
            }
            return ResponseEntity.ok().build();
        } else {
            var data = templateService.previewToHtml(userId, request);
            return ResponseEntity.ok(Map.of("html", data));
        }
    }

    @PostMapping("/{id}/export")
    public ResponseEntity print(@UserId long userId, @PathVariable("id") long templateId, @RequestBody(required = false) TemplateExportRequest request, HttpServletResponse httpServletResponse) throws IOException {
        if (TemplateExportRequest.Format.pdf.equals(request.getFormat())) {
            var data = templateService.print(userId, templateId, request);
            String encodedOriginalName = URLEncoder.encode(data.getRight(), String.valueOf(StandardCharsets.UTF_8));
            httpServletResponse.addHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + encodedOriginalName + ".pdf");
            httpServletResponse.setCharacterEncoding("UTF-8");
            try (var input = new ByteArrayInputStream(data.getKey())) {
                ByteStreams.copy(input, httpServletResponse.getOutputStream());
                httpServletResponse.flushBuffer();
            }
            return ResponseEntity.ok().build();
        } else {
            var data = templateService.printToHtml(userId, templateId, request);
            return ResponseEntity.ok(Map.of("html", data));
        }
    }

    @PostMapping("/{id}/share")
    public TemplateResponse share(@UserId long userId, @PathVariable("id") long templateId, @RequestBody @Valid TemplatePermissionRequest request) throws AccessDeniedException {
        return templateService.shareTemplate(userId, templateId, request);
    }

    @GetMapping("/{id}/permissions")
    public TemplateUserPermissionsResponse getTemplatePermissions(@UserId long userId, @PathVariable("id") long templateId, TemplateUserPermissionFilterRequest request) {
        return templateService.getTemplatePermissions(userId, templateId, request);
    }

    @GetMapping("/evaluate_permissions")
    public List<EvaluateTemplatePermissionResponse> evaluateTemplatePermissions(@UserId long userId, @RequestParam(value = "template_ids", required = true) List<Long> templateIds) {
        return templateService.evaluateTemplatePermissions(userId, templateIds);
    }


    @PostMapping("/app_permissions")
    public TemplateAppPermission saveTemplateAppPermission(@UserId long userId, @RequestBody @Valid TemplateAppPermissionRequest request) {
        return templateService.saveTemplateAppPermission(userId, request);
    }

    @GetMapping("/app_permissions/app_id/{id}")
    public TemplateAppPermission getTemplateAppPermission(@UserId long userId, @PathVariable("id") long appId) {
        return templateService.getTemplateAppPermission(userId, appId);
    }

    @DeleteMapping("/app_permissions/app_id/{id}")
    public void deleteTemplateAppPermission(@UserId long userId, @PathVariable("id") long appId) {
        templateService.deleteTemplateAppPermissionByAppId(userId, appId);
    }

}
