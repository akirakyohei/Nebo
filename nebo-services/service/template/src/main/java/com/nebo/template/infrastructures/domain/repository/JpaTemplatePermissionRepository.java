package com.nebo.template.infrastructures.domain.repository;

import com.nebo.template.infrastructures.domain.model.TemplatePermission;
import org.mapstruct.Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;
import java.util.Optional;

public interface JpaTemplatePermissionRepository extends JpaRepository<TemplatePermission, Long> {

    Optional<TemplatePermission> findFirstByOwnerUserIdAndTemplateId(long userId, long templateId);


    List<TemplatePermission> findAllByOwnerUserIdAndTemplateIdAndSharedUserIdIn(long userId, long templateId, List<Long> userIds);

    @Modifying
    void deleteAllByOwnerUserIdAndTemplateId(long userId, long templateId);
}
