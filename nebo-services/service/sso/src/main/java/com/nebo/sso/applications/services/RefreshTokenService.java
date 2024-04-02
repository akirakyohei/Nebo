package com.nebo.sso.applications.services;

import com.nebo.sso.infrastructures.config.NeboJwtConfigureProperties;
import com.nebo.sso.infrastructures.domain.model.RefreshToken;
import com.nebo.sso.infrastructures.domain.repository.JpaRefreshTokenRepository;
import com.nebo.sso.infrastructures.domain.repository.JpaUserRepository;
import com.nebo.web.applications.exception.ExpiredTokenRefreshException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final NeboJwtConfigureProperties jwtProperties;
    private final JpaRefreshTokenRepository refreshTokenRepository;
    private final JpaUserRepository userRepository;

    public RefreshToken findByToken(String token) {
        return refreshTokenRepository.findByRefreshToken(token).orElse(null);
    }

    public RefreshToken createRefreshToken(Long userId) {
        var user = userRepository.findById(userId).orElse(null);
        var refreshToken = new RefreshToken(user, UUID.randomUUID().toString(), Instant.now().plusMillis(jwtProperties.getRefreshExpiration()));
        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(String token) throws ExpiredTokenRefreshException {
        var refreshToken = findByToken(token);
        if (token == null)
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


    private RefreshToken verifyExpiration(RefreshToken token) throws ExpiredTokenRefreshException {
        if (token.getExpiredDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new ExpiredTokenRefreshException();
        }
        return token;
    }


}
