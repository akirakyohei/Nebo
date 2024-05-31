package com.nebo.template.applications.services;

import com.nebo.lib.feignclient.client.B;
import com.nebo.lib.feignclient.client.NeboFeignClient;
import com.nebo.lib.feignclient.client.model.FileDataUploadRequest;
import com.nebo.template.applications.model.template.*;
import com.nebo.template.applications.services.mapper.TemplateMapper;
import com.nebo.template.infrastructures.domain.Specifiaction.TemplateSpecification;
import com.nebo.template.infrastructures.domain.model.Category_;
import com.nebo.template.infrastructures.domain.model.Template;
import com.nebo.template.infrastructures.domain.repository.JpaCategoryRepository;
import com.nebo.template.infrastructures.domain.repository.JpaFileDataRepository;
import com.nebo.template.infrastructures.domain.repository.JpaTemplateRepository;
import com.nebo.utils.IOUtils;
import com.nebo.utils.MediaUtils;
import com.nebo.web.applications.exception.ConstraintViolationException;
import com.nebo.web.applications.exception.NotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.query.Page;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.MessageFormat;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TemplateService {

    @Value("${nebo.default-user-id}")
    private Integer defaultUserId;

    private final JpaTemplateRepository templateRepository;

    private final JpaCategoryRepository categoryRepository;
    private final JpaFileDataRepository fileDataRepository;

    private final TemplateMapper templateMapper;

    private final NeboFeignClient neboFeignClient;

    private final TemplatePrintService printService;

    @Transactional
    public TemplateResponse createTemplate(long userId, TemplateCreateRequest request) throws ConstraintViolationException, IOException {
        validateTemplateRequest(userId, request);
        var template = templateMapper.fromRequestToDomain(request);
        template.setUserId(userId);
        template = templateRepository.save(template);
        if (!StringUtils.isBlank(template.getHtml())) {
            var imageByteArrays = printService.printToImage(userId, TemplatePrintRequest.builder()
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
                        .build(), B.widthUserId(userId)).getFile();
                template.setThumbnailImageId(res.getId());
            } catch (UnsupportedEncodingException e) {
                throw new RuntimeException(e);
            }
        }
        return getTemplate(userId, template.getId());
    }

    @Transactional
    public TemplateResponse updateTemplate(long userId, long templateId, TemplateUpdateRequest request) throws ConstraintViolationException, IOException {
        validateTemplateRequest(userId, request);
        var template = templateRepository.findTemplateByUserIdAndId(userId, templateId)
                .orElseThrow(NotFoundException::new);
        if (!StringUtils.isBlank(template.getHtml())) {
            var imageByteArrays = printService.printToImage(userId, TemplatePrintRequest.builder()
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
                            .build(), B.widthUserId(userId)).getFile();
                    template.setThumbnailImageId(res.getId());
                } else {
                    var res = neboFeignClient.updateFile(template.getThumbnailImageId(), FileDataUploadRequest.builder()
                            .file(FileDataUploadRequest.FileDataUpload.builder()
                                    .contentType("image/png")
                                    .key(MediaUtils.buildMediaKey(userId, MessageFormat.format("template-{0}.png", template.getId()), "templates"))
                                    .name(MessageFormat.format("template-{0}.png", template.getId()))
                                    .data(imageByteArrays)
                                    .build())
                            .build(), B.widthUserId(userId)).getFile();
                    template.setThumbnailImageId(res.getId());
                }

            } catch (UnsupportedEncodingException e) {
                throw new RuntimeException(e);
            }
        }
        templateMapper.updateTemplate(request, template);
        templateRepository.save(template);
        return getTemplate(userId, templateId);
    }

    public TemplateResponse getTemplate(long userId, long templateId) {
        var template = templateRepository.findTemplateByUserIdAndId(userId, templateId)
                .orElseThrow(NotFoundException::new);
        return fromDomainToResponse(userId, List.of(template)).get(0);
    }

    public TemplateResponse getDefaultTemplate(long templateId) {
        return getTemplate(defaultUserId, templateId);
    }

    public TemplatesResponse getTemplates(long userId, TemplateFilterRequest request) {
        var pageable = request.toPageable(Sort.by(Sort.Direction.DESC, Category_.CREATED_AT));
        var spec = TemplateSpecification.toFilter(userId, request);
        var page = templateRepository.findAll(spec, pageable);
        return new TemplatesResponse(new PageImpl<>(fromDomainToResponse(userId, page.getContent()), pageable, page.getTotalElements()));
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

    List<TemplateResponse> fromDomainToResponse(long userId, List<Template> templates) {
        var fileDataIds = templates.stream().map(Template::getThumbnailImageId).filter(Objects::nonNull).toList();
        var fileDatas = fileDataRepository.findFileDataByUserIdAndIdIn(userId, fileDataIds);
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



