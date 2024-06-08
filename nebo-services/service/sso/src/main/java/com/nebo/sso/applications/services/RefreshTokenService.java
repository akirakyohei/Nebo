package com.nebo.sso.applications.services;

import com.nebo.shared.security.config.NeboJwtConfigureProperties;
import com.nebo.sso.domain.model.Session;
import com.nebo.sso.domain.repository.JpaSessionRepository;
import com.nebo.sso.domain.repository.JpaUserRepository;
import com.nebo.shared.web.applications.exception.ExpiredTokenRefreshException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final NeboJwtConfigureProperties jwtProperties;
    private final JpaSessionRepository refreshTokenRepository;
    private final JpaUserRepository userRepository;

    public Session findByToken(String token) {
        return refreshTokenRepository.findByRefreshToken(token).orElse(null);
    }

    public Session createRefreshToken(Long userId, String ipAddress, String userAgent, String token) {
        var user = userRepository.findById(userId).orElse(null);
        var refreshToken = new Session(user, UUID.randomUUID().toString(), token, ipAddress, userAgent, Instant.now().plusMillis(jwtProperties.getRefreshExpiration()));
        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    @Transactional
    public void updateRefreshToken(Long userId, String refreshToken, String token) {
        refreshTokenRepository.updateRefreshToken(userId, refreshToken, token);
    }

    public Session verifyExpiration(String token) throws ExpiredTokenRefreshException {
        var refreshToken = findByToken(token);
        if (token == null || refreshToken == null)
            throw new ExpiredTokenRefreshException();
        return verifyExpiration(refreshToken);
    }

    @Transactional
    public void cleanRefreshTokenExpired() {
        refreshTokenRepository.removeAllByExpiredDateBefore(Instant.now());
    }

    @Transactional
    public void deleteByUserId(Long userId, String token) {
        if (token == null)
            refreshTokenRepository.removeAllByUserId(userId);
        refreshTokenRepository.removeByUserIdAndToken(userId, token);
    }


    private Session verifyExpiration(Session token) throws ExpiredTokenRefreshException {
        if (token.getExpiredDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new ExpiredTokenRefreshException();
        }
        return token;
    }


}
