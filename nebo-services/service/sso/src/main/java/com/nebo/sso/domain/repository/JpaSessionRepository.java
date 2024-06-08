package com.nebo.sso.domain.repository;

import com.nebo.sso.domain.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface JpaSessionRepository extends JpaRepository<Session, Long> {
    Optional<Session> findByRefreshToken(String refreshToken);
    Optional<Session> findByUserIdAndToken(long userId,String token);

    List<Session> findAllByUserId(long userId);

    @Modifying
    @Query("UPDATE Session set token=:token WHERE user.id=:userId AND refreshToken=:refreshToken")
    void updateRefreshToken(@Param("userId") long userId,@Param("refreshToken") String refreshToken,@Param("token") String token);

    @Modifying
    void removeAllByUserId(long userId);

    @Modifying
    void removeByUserIdAndToken(long userId, String token);

    @Modifying
    void removeAllByExpiredDateBefore(Instant date);
}
