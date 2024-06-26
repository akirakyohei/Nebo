package com.nebo.template.applications.services;

import com.nebo.lib.feignclient.client.B;
import com.nebo.lib.feignclient.client.NeboFeignClient;
import com.nebo.lib.feignclient.client.model.FileDataUploadRequest;
import com.nebo.shared.security.utils.NeboSecurityUtils;
import com.nebo.shared.web.applications.exception.ConstraintViolationException;
import com.nebo.shared.web.applications.exception.NotFoundException;
import com.nebo.template.applications.model.template.*;
import com.nebo.template.applications.services.mapper.TemplateMapper;
import com.nebo.template.domain.model.PrintLog;
import com.nebo.template.domain.model.Template;
import com.nebo.shared.common.utils.MediaUtils;
import com.nebo.template.domain.repository.*;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.MessageFormat;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TemplateService {

    @Value("${nebo.default-user-id}")
    private Integer defaultUserId;

    private final JpaTemplateRepository jpaTemplateRepository;

    private final TemplateRepository templateRepository;

    private final JpaCategoryRepository categoryRepository;
    private final JpaFileDataRepository fileDataRepository;
    private final JpaPrintLogRepository printLogRepository;

    private final TemplateMapper templateMapper;

    private final NeboFeignClient neboFeignClient;

    private final TemplatePrintService printService;

    private final TemplatePermissionService templatePermissionService;

    @Transactional("templateTransactionManager")
    public TemplateResponse createTemplate(long userId, TemplateCreateRequest request) throws ConstraintViolationException, IOException {
        validateTemplateRequest(userId, request);
        var template = templateMapper.fromRequestToDomain(request);
        template.setUserId(userId);
        template.setActive(true);
        template = jpaTemplateRepository.save(template);
        if (!StringUtils.isBlank(template.getHtml())) {
            var imageByteArrays = printService.printToImage(userId, TemplatePrintModel.builder()
                    .fillData(false)
                    .html(template.getHtml())
                    .options(templateMapper.fromDomainToResponse(template.getOptions()))
                    .build());
            try {
                var res = neboFeignClient.uploadFile(FileDataUploadRequest.builder()
                        .file(FileDataUploadRequest.FileDataUpload.builder()
                                .contentType("image/png")
                                .key(MediaUtils.buildMediaKey(userId, MessageFormat.format("template-{0}.png", template.getId()), "templates"))
                                .name(MessageFormat.format("template-{0}.png", template.getId()))
                                .data(imageByteArrays)
                                .build())
                        .build(), B.withUserId(userId)).getFile();
                template.setThumbnailImageId(res.getId());
                try {
                    jpaTemplateRepository.save(template);
                } catch (Exception ex) {
                }
            } catch (UnsupportedEncodingException e) {
                throw new RuntimeException(e);
            }
        }
        return getTemplate(userId, template.getId());
    }

    @Transactional("templateTransactionManager")
    public TemplateResponse updateTemplate(long userId, long templateId, TemplateUpdateRequest request) throws ConstraintViolationException, IOException {
        validateTemplateRequest(userId, request);
        var template = jpaTemplateRepository.findById(templateId)
                .orElseThrow(NotFoundException::new);
        var permissions = templatePermissionService.evaluatePermission(userId, template);
        if (!permissions.contains(UserPermission.write))
            throw new AccessDeniedException("template access denied");
        if (!template.isActive()) {
            request.setHtml(null);
            request.setComponents(null);
            request.setStyles(null);
            request.setTestData(null);
            request.setOptions(null);
            request.setAssets(null);
            request.setCss(null);
        }
        if (!Objects.equals(template.getUserId(), userId)) {
            request.setActive(null);
            request.setOptions(null);
            request.setCategoryIds(null);
            request.setName(null);
        }
        templateMapper.updateTemplate(request, template);
        if (!StringUtils.isBlank(template.getHtml())) {
            var imageByteArrays = printService.printToImage(userId, TemplatePrintModel.builder()
                    .fillData(false)
                    .html(template.getHtml())
                    .options(templateMapper.fromDomainToResponse(template.getOptions()))
                    .build());
            try {
                if (template.getThumbnailImageId() == null || template.getThumbnailImageId() == 0) {
                    var res = neboFeignClient.uploadFile(FileDataUploadRequest.builder()
                            .file(FileDataUploadRequest.FileDataUpload.builder()
                                    .contentType("image/png")
                                    .key(MediaUtils.buildMediaKey(userId, MessageFormat.format("template-{0}.png", template.getId()), "templates"))
                                    .name(MessageFormat.format("template-{0}.png", template.getId()))
                                    .data(imageByteArrays)
                                    .build())
                            .build(), B.withUserId(userId)).getFile();
                    template.setThumbnailImageId(res.getId());
                } else {
                    var res = neboFeignClient.updateFile(template.getThumbnailImageId(), FileDataUploadRequest.builder()
                            .file(FileDataUploadRequest.FileDataUpload.builder()
                                    .contentType("image/png")
                                    .key(MediaUtils.buildMediaKey(userId, MessageFormat.format("template-{0}.png", template.getId()), "templates"))
                                    .name(MessageFormat.format("template-{0}.png", template.getId()))
                                    .data(imageByteArrays)
                                    .build())
                            .build(), B.withUserId(userId)).getFile();
                    template.setThumbnailImageId(res.getId());
                }

            } catch (UnsupportedEncodingException e) {
                throw new RuntimeException(e);
            }
        }
        jpaTemplateRepository.save(template);
        return getTemplate(userId, templateId);
    }

    public TemplateResponse getTemplate(long userId, long templateId) throws AccessDeniedException {
        var template = jpaTemplateRepository.findById(templateId)
                .orElseThrow(NotFoundException::new);
        evaluateAppPermissionByTemplateId(userId, templateId);
        var permissions = templatePermissionService.evaluatePermission(userId, template);
        if (!permissions.contains(UserPermission.read))
            throw new AccessDeniedException("Template access denied");
        return fromDomainToResponse(userId, List.of(template)).get(0);
    }

    public TemplateResponse getDefaultTemplate(long templateId) throws AccessDeniedException {
        return getTemplate(defaultUserId, templateId);
    }

    public TemplatesResponse getTemplates(long userId, TemplateFilterRequest request) throws ConstraintViolationException {
        var appId = NeboSecurityUtils.detectAppId();
        if (appId != null) {
            if (request.getShared())
                throw new ConstraintViolationException("shared", "Unsupport for app permission");
            var templateIds = evaluateAppPermissionByAppId(userId, appId);
            if (!CollectionUtils.isEmpty(templateIds)) {
                request.setIds(CollectionUtils.isEmpty(request.getIds()) ? templateIds : request.getIds().stream().filter(templateIds::contains).toList());
            } else if (templateIds != null) {
                return new TemplatesResponse(Page.empty());
            }
        }
        var page = templateRepository.findAll(userId, request);
        return new TemplatesResponse(new PageImpl<>(fromDomainToResponse(userId, page.getContent()), request.toPageable(), page.getTotalElements()));
    }

    public TemplatesResponse getDefaultTemplates(TemplateFilterRequest request) throws ConstraintViolationException {
        return getTemplates(defaultUserId, request);
    }


    @Transactional("templateTransactionManager")
    public void deleteTemplate(long userId, int templateId) {
        var template = jpaTemplateRepository.findTemplateByUserIdAndId(userId, templateId).orElseThrow(NotFoundException::new);
        templatePermissionService.updateAppPermissionWhenDeleteTemplate(userId, templateId);
        templatePermissionService.deleteUserPermissionByOwnerIdAndTemplateId(userId, templateId);
        jpaTemplateRepository.delete(template);
    }

    public Pair<byte[], String> preview(long actorId, TemplatePreviewRequest request) throws IOException {
        var result = printService.print(actorId, TemplatePrintModel.builder()
                .fillData(request != null && request.getVariables() != null && !request.getVariables().isEmpty())
                .html(request.getHtml())
                .options(request.getOptions())
                .variables(request != null ? request.getVariables() : null)
                .build());
        return Pair.of(result, "preview-" + UUID.randomUUID());
    }

    public String previewToHtml(long actorId, TemplatePreviewRequest request) throws IOException {
        var result = printService.printToHtml(actorId, TemplatePrintModel.builder()
                .fillData(request != null && request.getVariables() != null && !request.getVariables().isEmpty())
                .html(request.getHtml())
                .options(request.getOptions())
                .variables(request != null ? request.getVariables() : null)
                .build());
        return result;
    }

    public Pair<byte[], String> print(long actorId, long templateId, TemplateExportRequest request) throws IOException {
        var template = jpaTemplateRepository.findById(templateId).orElseThrow(NotFoundException::new);
        var permissions = templatePermissionService.evaluatePermission(actorId, template);
        evaluateAppPermissionByTemplateId(actorId, templateId);
        if (!permissions.contains(UserPermission.read))
            throw new AccessDeniedException("template access denied");
        var result = printService.print(actorId, TemplatePrintModel.builder()
                .fillData(request != null && request.getVariables() != null && !request.getVariables().isEmpty())
                .html(template.getHtml())
                .options(templateMapper.fromDomainToResponse(template.getOptions()))
                .variables(request != null ? request.getVariables() : null)
                .build());
        var printLog = new PrintLog(template.getUserId(), actorId, templateId, template.getPaperTypeId());
        printLogRepository.save(printLog);
        return Pair.of(result, template.getName());
    }

    public String printToHtml(long actorId, long templateId, TemplateExportRequest request) throws IOException {
        var template = jpaTemplateRepository.findById(templateId).orElseThrow(NotFoundException::new);
        var permissions = templatePermissionService.evaluatePermission(actorId, template);
        evaluateAppPermissionByTemplateId(actorId, templateId);
        if (!permissions.contains(UserPermission.read))
            throw new AccessDeniedException("template access denied");
        var result = printService.printToHtml(actorId, TemplatePrintModel.builder()
                .fillData(request != null && request.getVariables() != null && !request.getVariables().isEmpty())
                .html(template.getHtml())
                .options(templateMapper.fromDomainToResponse(template.getOptions()))
                .variables(request != null ? request.getVariables() : null)
                .build());
        var printLog = new PrintLog(template.getUserId(), actorId, templateId, template.getPaperTypeId());
        printLogRepository.save(printLog);
        return result;
    }

    //#region [Permission]
    @Transactional("templateTransactionManager")
    public TemplateResponse shareTemplate(long userId, long templateId, TemplatePermissionRequest request) throws AccessDeniedException {
        var template = jpaTemplateRepository.findTemplateByUserIdAndId(userId, templateId).orElseThrow(NotFoundException::new);
        if (request.getSharedStatus() == null)
            request.setSharedStatus(template.getSharedStatus());
        templatePermissionService.shareTemplate(userId, template, request);
        template.setSharedStatus(request.getSharedStatus());
        jpaTemplateRepository.save(template);
        return getTemplate(userId, templateId);
    }

    @Transactional("templateTransactionManager")
    public TemplateAppPermission saveTemplateAppPermission(long userId, TemplateAppPermissionRequest request) {
        try {
            neboFeignClient.getApiAppById(request.getAppId(), B.withUserId(userId));
        } catch (Exception ex) {
            throw new NotFoundException();
        }

        List<Template> templates = null;
        if (request.getTemplateIds() != null)
            templates = jpaTemplateRepository.findAllByUserIdAndIdIn(userId, request.getTemplateIds());
        return templatePermissionService.saveTemplateAppPermission(userId, request.getAppId(), templates != null ? templates.stream().map(Template::getId).toList() : null);
    }

    public TemplateAppPermission getTemplateAppPermission(long userId, long appId) {
        try {
            neboFeignClient.getApiAppById(appId, B.withUserId(userId));
        } catch (Exception ex) {
            throw new NotFoundException();
        }
        return templatePermissionService.getTemplateAppPermission(userId, appId);
    }

    public TemplateUserPermissionsResponse getTemplatePermissions(long userId, long templateId, TemplateUserPermissionFilterRequest request) {
        var template = jpaTemplateRepository.findTemplateByUserIdAndId(userId, templateId).orElseThrow(NotFoundException::new);
        return templatePermissionService.getTemplatePermissions(userId, template, request);
    }

    public void evaluateAppPermissionByTemplateId(long userId, long templateId) {
        var appId = NeboSecurityUtils.detectAppId();
        if (appId == null)
            return;
        if (!templatePermissionService.evaluateAppPermission(userId, appId, templateId))
            throw new AccessDeniedException("App permission not allow");
    }

    public List<Long> evaluateAppPermissionByAppId(long userId, long appId) {
        var appPermission = getTemplateAppPermission(userId, appId);
        return appPermission.getTemplateIds();
    }

    public void deleteTemplateAppPermissionByAppId(long userId, long appId) {
        templatePermissionService.deleteTemplateAppPermission(userId, appId);
    }

    public List<EvaluateTemplatePermissionResponse> evaluateTemplatePermissions(long userId, List<Long> templateIds) {
        var templates = jpaTemplateRepository.findAllByIdIn(templateIds);
        return templatePermissionService.evaluateTemplatePermissions(userId, templates);
    }

    //#endregion

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

    private List<TemplateResponse> fromDomainToResponse(long userId, List<Template> templates) {
        var fileDataIds = templates.stream().map(Template::getThumbnailImageId).filter(Objects::nonNull).toList();
        var fileDatas = fileDataRepository.findFileDataByIdIn(fileDataIds);
        return templates.stream().map(template -> {
                    var result = templateMapper.fromDomainToResponse(template);
                    if (StringUtils.isBlank(result.getHtml())) {
                        result.setThumbnail(new ImageResponse());
                        return result;
                    }
                    var fileData = fileDatas.stream().filter(a -> Objects.equals(a.getId(), template.getThumbnailImageId())).findFirst().orElse(null);
                    if (fileData != null)
                        result.setThumbnail(templateMapper.fromDomainToResponse(fileData));
                    return result;
                }
        ).toList();
    }


}



