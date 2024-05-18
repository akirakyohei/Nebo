package com.nebo.sso.applications.services;

import com.nebo.applications.config.NeboJwtConfigureProperties;
import com.nebo.sso.applications.model.JwtResponse;
import com.nebo.sso.applications.model.UserCredentialResponse;
import com.nebo.sso.applications.model.UserDetailsImpl;
import com.nebo.sso.applications.model.UserResponse;

import com.nebo.sso.infrastructures.domain.model.User;
import com.nebo.web.applications.exception.ExpiredTokenRefreshException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecureDigestAlgorithm;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Arrays;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthenticateProvider {


    private final NeboJwtConfigureProperties jwtProperties;
    private final RefreshTokenService refreshTokenService;

    public JwtResponse generateJwtToken(User user, String ipAddress, String userAgent) {
        var userDetail = new UserDetailsImpl(user);
        var token = generateJwtToken(userDetail);
        var refreshToken = refreshTokenService.createRefreshToken(userDetail.getId(), ipAddress, userAgent,token);
        return JwtResponse.builder()
                .id(user.getId())
                .permissions(user.getPermissions())
                .token(token)
                .refreshToken(refreshToken.getRefreshToken())
                .build();
    }

    public JwtResponse refreshJwtToken(User user, String refreshToken) {
        var userDetail = new UserDetailsImpl(user);
        var token = generateJwtToken(userDetail);
        refreshTokenService.updateRefreshToken(user.getId(),refreshToken,token);
        return JwtResponse.builder()
                .id(user.getId())
                .permissions(user.getPermissions())
                .token(token)
                .refreshToken(refreshToken)
                .build();
    }

    private String generateJwtToken(UserDetailsImpl userDetails) {
        var issuedAt = Date.from(Instant.now());
        var expiredDate = Date.from(Instant.now().plusMillis(jwtProperties.getExpiration()));
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(issuedAt)
                .expiration(expiredDate)
                .signWith(Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes(StandardCharsets.UTF_8)), Jwts.SIG.HS512)
                .claims(Jwts.claims()
                        .issuedAt(issuedAt)
                        .expiration(expiredDate)
                        .add("id", userDetails.getId())
                        .add("firstName", userDetails.getFirstName())
                        .add("lastName", userDetails.getLastName())
                        .add("permissions", userDetails.getAuthorities() != null ? userDetails.getAuthorities().stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.joining(",")) : "")
                        .build())
                .compact();
    }
}
