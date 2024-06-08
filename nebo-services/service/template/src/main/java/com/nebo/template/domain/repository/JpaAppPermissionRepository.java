package com.nebo.template.domain.repository;

import com.nebo.template.domain.model.AppPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;
import java.util.Optional;

public interface JpaAppPermissionRepository extends JpaRepository<AppPermission, Long> {

    Optional<AppPermission> findFirstByUserIdAndAppId(long userId, long appId);

    List<AppPermission> findAllByUserId(long userId);

    @Modifying
    void removeByUserIdAndAppId(long userId, long appId);
}
