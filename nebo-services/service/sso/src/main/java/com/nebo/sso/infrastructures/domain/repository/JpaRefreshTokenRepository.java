package com.nebo.sso.infrastructures.domain.repository;

import com.nebo.sso.infrastructures.domain.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.time.Instant;
import java.util.Optional;

public interface JpaRefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByRefreshToken(String refreshToken);


    @Modifying
    void removeAllByUserId(long userId);

    @Modifying
    void removeByUserIdAndToken(long userId, String token);

    @Modifying
    void removeAllByExpiredDateBefore(Instant date);
}
