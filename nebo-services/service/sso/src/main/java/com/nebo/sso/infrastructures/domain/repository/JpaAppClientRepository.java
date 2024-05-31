package com.nebo.sso.infrastructures.domain.repository;

import com.nebo.sso.infrastructures.domain.model.AppClient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaAppClientRepository extends JpaRepository<AppClient, Long> {
    Optional<AppClient> findAppClientByUserIdAndId(long userId, long id);

    Optional<AppClient> findAppClientByAccessToken( String accessToken);

    Page<AppClient> findAllByUserId(long userId, Pageable pageable);
}
