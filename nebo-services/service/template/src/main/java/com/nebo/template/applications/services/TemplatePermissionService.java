package com.nebo.template.applications.services;

import com.nebo.lib.feignclient.client.B;
import com.nebo.lib.feignclient.client.NeboFeignClient;
import com.nebo.lib.feignclient.client.model.User;
import com.nebo.lib.feignclient.client.model.UserFilterRequest;
import com.nebo.shared.web.applications.exception.NotFoundException;
import com.nebo.template.applications.services.mapper.TemplateMapper;
import com.nebo.template.domain.model.AppPermission;
import com.nebo.template.domain.model.Template;
import com.nebo.template.domain.model.UserPermission_;
import com.nebo.template.domain.repository.JpaAppPermissionRepository;
import com.nebo.template.domain.repository.JpaUserPermissionRepository;
import com.nebo.template.applications.model.template.*;
import com.nebo.template.domain.Specifiaction.TemplatePermissionSpecification;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TemplatePermissionService {

    private final JpaUserPermissionRepository templatePermissionRepository;
    private final JpaAppPermissionRepository appPermissionRepository;
    private final NeboFeignClient neboFeignClient;

    private final TemplateMapper templateMapper;

    public TemplateUserPermissionsResponse getTemplatePermissions(long userId, Template template, TemplateUserPermissionFilterRequest request) {
        var pageable = request.toPageable(Sort.by(Sort.Direction.DESC, UserPermission_.UPDATED_AT));
        if (StringUtils.isNotBlank(request.getQuery())) {
            var users = neboFeignClient.getUsers(UserFilterRequest.builder().query(request.getQuery()).limit(250).page(1).build(), B.withUserId(userId)).getUsers().getData();
            request.setSharedUserIds(users.stream().map(User::getId).toList());
        }
        var spec = TemplatePermissionSpecification.toFilter(userId, template.getId(), request);
        var page = templatePermissionRepository.findAll(spec, pageable);
        return new TemplateUserPermissionsResponse(page.map(templateMapper::fromDomainToResponse));
    }

    public List<EvaluateTemplatePermissionResponse> evaluateTemplatePermissions(long sharedUserId, List<Template> templates) {
        var templateIds = templates.stream().map(Template::getId).toList();
        var templatePermissions = templatePermissionRepository.findAllBySharedUserIdAndTemplateIdIn(sharedUserId, templateIds);
        return templates.stream().map(template -> {
            var evaluateTemplatePermission = new EvaluateTemplatePermissionResponse(template.getId(), template.getUserId());
            var templatePermission = templatePermissions.stream().filter(a -> Objects.equals(a.getTemplateId(), template.getId()))
                    .findFirst().orElse(null);
            evaluateTemplatePermission.setPermissions(evaluatePermission(sharedUserId, template, templatePermission));
            return evaluateTemplatePermission;
        }).toList();
    }

    public List<UserPermission> evaluatePermission(long userId, Template template, com.nebo.template.domain.model.UserPermission userPermission) {
        if (userId == template.getUserId()) {
            return List.of(UserPermission.write, UserPermission.read);
        }
        if (Template.SharedStatus.only_you.equals(template.getSharedStatus()))
            return List.of();
        if (userPermission != null)
            return userPermission.getPermissions().stream().map(UserPermission::valueOf).toList();
        return Template.SharedStatus.allow_all.equals(template.getSharedStatus()) ? List.of(UserPermission.read) : List.of();
    }

    public List<UserPermission> evaluatePermission(long userId, Template template) {
        if (userId == template.getUserId()) {
            return List.of(UserPermission.write, UserPermission.read);
        }
        if (Template.SharedStatus.only_you.equals(template.getSharedStatus()))
            return List.of();
        var templatePermission = templatePermissionRepository.findFirstByOwnerUserIdAndTemplateId(template.getUserId(), template.getId()).orElse(null);
        if (templatePermission != null)
            return templatePermission.getPermissions().stream().map(UserPermission::valueOf).toList();
        return Template.SharedStatus.allow_all.equals(template.getSharedStatus()) ? List.of(UserPermission.read) : List.of();
    }

    public void shareTemplate(long userId, Template template, TemplatePermissionRequest request) {
        if (!Objects.equals(template.getSharedStatus(), request.getSharedStatus())) {
            if (Template.SharedStatus.only_you.equals(request.getSharedStatus())) {
                templatePermissionRepository.deleteAllByOwnerUserIdAndTemplateId(userId, template.getId());
            }
            return;
        }
        if (Template.SharedStatus.only_you.equals(request.getSharedStatus()))
            return;

        if (!CollectionUtils.isEmpty(request.getPutUsers())) {
            List<Long> putUserIds = request.getPutUsers().stream().map(TemplatePermissionRequest.UserPermissionRequest::getUserId).toList();
            var users = neboFeignClient.getUsers(UserFilterRequest.builder()
                    .ids(putUserIds).limit(250).page(1).build(), B.withUserId(userId)).getUsers();
            putUserIds.forEach(a -> {
                var existUser = users.getData().stream().filter(b -> b.getId() == a).findFirst().isEmpty();
                if (existUser)
                    throw new NotFoundException();
            });
            var existTemplatePermissions = templatePermissionRepository.findAllByOwnerUserIdAndTemplateIdAndSharedUserIdIn(userId, template.getId(), putUserIds);
            List<com.nebo.template.domain.model.UserPermission> userPermissions = request.getPutUsers().stream().map(a -> {
                var existTemplatePermission = existTemplatePermissions.stream().filter(b -> b.getSharedUserId() == a.getUserId()).findFirst().orElse(new com.nebo.template.domain.model.UserPermission(template.getId(), userId, a.getUserId()));
                existTemplatePermission.setPermissions(a.getPermissions().stream().map(Enum::name).toList());
                return existTemplatePermission;
            }).toList();
            templatePermissionRepository.saveAll(userPermissions);
        }

        if (CollectionUtils.isEmpty(request.getRemoveUsers())) {
            var removeUseIds = request.getRemoveUsers();
            templatePermissionRepository.findAllByOwnerUserIdAndTemplateIdAndSharedUserIdIn(userId, template.getId(), removeUseIds);
        }
    }

    //# region [AppPermission]
    TemplateAppPermission saveTemplateAppPermission(long userId, long appId, List<Long> templateIds) {
        var appPermission = appPermissionRepository.findFirstByUserIdAndAppId(userId, appId).orElse(new AppPermission(userId, appId));
        appPermission.setTemplateIds(templateIds);
        appPermissionRepository.save(appPermission);
        return templateMapper.fromDomainToResponse(appPermission);
    }

    void updateAppPermissionWhenDeleteTemplate(long userId, long templateId) {
        var appPermissions = appPermissionRepository.findAllByUserId(userId);
        var updatedAppPermissions = appPermissions.stream().map(app -> {
            if (app.getTemplateIds() == null || app.getTemplateIds().contains(templateId))
                return null;
            app.setTemplateIds(app.getTemplateIds().stream().filter(b -> b != templateId).toList());
            return app;
        }).filter(Objects::nonNull).toList();
        appPermissionRepository.saveAll(updatedAppPermissions);
    }

    @Transactional
    void deleteTemplateAppPermission(long userId, long appId) {
        appPermissionRepository.removeByUserIdAndAppId(userId, appId);
    }

    boolean evaluateAppPermission(long userId, long appId, long templateId) {
        var appPermission = appPermissionRepository.findFirstByUserIdAndAppId(userId, appId).orElse(null);
        if (appPermission == null || appPermission.getTemplateIds() == null)
            return true;
        return appPermission.getTemplateIds().contains(templateId);
    }

    TemplateAppPermission getTemplateAppPermission(long userId, long appId) {
        var appPermission = appPermissionRepository.findFirstByUserIdAndAppId(userId, appId).orElse(new AppPermission(userId, appId));
        return templateMapper.fromDomainToResponse(appPermission);
    }
    //#endregion
}
