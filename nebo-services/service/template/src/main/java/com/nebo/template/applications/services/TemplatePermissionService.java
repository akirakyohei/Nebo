package com.nebo.template.applications.services;

import com.nebo.lib.feignclient.client.B;
import com.nebo.lib.feignclient.client.NeboFeignClient;
import com.nebo.lib.feignclient.client.model.UserFilterRequest;
import com.nebo.template.applications.model.template.TemplatePermissionRequest;
import com.nebo.template.applications.model.template.TemplateUserPermission;
import com.nebo.template.infrastructures.domain.model.Template;
import com.nebo.template.infrastructures.domain.model.TemplatePermission;
import com.nebo.template.infrastructures.domain.repository.JpaTemplatePermissionRepository;
import com.nebo.web.applications.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TemplatePermissionService {

    private final JpaTemplatePermissionRepository templatePermissionRepository;
    private final NeboFeignClient neboFeignClient;

    public List<TemplateUserPermission> evaluatePermission(long userId, Template template) {
        if (userId == template.getUserId()) {
            return List.of(TemplateUserPermission.write, TemplateUserPermission.read);
        }
        if (Template.SharedStatus.only_you.equals(template.getSharedStatus()))
            return List.of();
        var templatePermission = templatePermissionRepository.findFirstByOwnerUserIdAndTemplateId(template.getUserId(), template.getId()).orElse(null);
        if (templatePermission != null)
            return templatePermission.getPermissions().stream().map(TemplateUserPermission::valueOf).toList();
        return Template.SharedStatus.allow_all.equals(template.getSharedStatus()) ? List.of(TemplateUserPermission.read) : List.of();
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
            List<TemplatePermission> templatePermissions = request.getPutUsers().stream().map(a -> {
                var existTemplatePermission = existTemplatePermissions.stream().filter(b -> b.getSharedUserId() == a.getUserId()).findFirst().orElse(new TemplatePermission(template.getId(), userId, a.getUserId()));
                existTemplatePermission.setPermissions(a.getPermissions().stream().map(Enum::name).toList());
                return existTemplatePermission;
            }).toList();
            templatePermissionRepository.saveAll(templatePermissions);
        }

        if (CollectionUtils.isEmpty(request.getRemoveUsers())) {
            var removeUseIds = request.getRemoveUsers();
            templatePermissionRepository.findAllByOwnerUserIdAndTemplateIdAndSharedUserIdIn(userId, template.getId(), removeUseIds);
        }
    }


}
