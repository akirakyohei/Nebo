package com.nebo.sso.infrastructures.domain.repository;

import com.nebo.sso.infrastructures.domain.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface JpaSessionRepository extends JpaRepository<Session, Long> {
    Optional<Session> findByRefreshToken(String refreshToken);
    Optional<Session> findByUserIdAndToken(long userId,String token);

    List<Session> findAllByUserId(long userId);

    @Modifying
    void removeAllByUserId(long userId);

    @Modifying
    void removeByUserIdAndToken(long userId, String token);

    @Modifying
    void removeAllByExpiredDateBefore(Instant date);
}
