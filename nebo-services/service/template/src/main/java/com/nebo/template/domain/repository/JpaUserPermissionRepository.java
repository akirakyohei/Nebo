package com.nebo.template.domain.repository;

import com.nebo.template.domain.model.UserPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;
import java.util.Optional;

public interface JpaUserPermissionRepository extends JpaRepository<UserPermission, Long>, JpaSpecificationExecutor<UserPermission> {

    Optional<UserPermission> findFirstByOwnerUserIdAndTemplateId(long userId, long templateId);

    List<UserPermission> findAllBySharedUserIdAndTemplateIdIn(long sharedUserId, List<Long> userIds);


    List<UserPermission> findAllByOwnerUserIdAndTemplateIdAndSharedUserIdIn(long userId, long templateId, List<Long> userIds);

    @Modifying
    void deleteAllByOwnerUserIdAndTemplateId(long userId, long templateId);
}
