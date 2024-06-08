package com.nebo.shared.security.services;

import com.nebo.grpc.lib.AppClientAuthenticationRequest;
import com.nebo.grpc.lib.AuthenticationRequest;
import com.nebo.shared.grpc.NeboGrpc;

import com.nebo.shared.security.client.AppClient;
import com.nebo.shared.security.client.UserCredentialResponse;
import com.nebo.shared.security.config.NeboJwtConfigureProperties;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final NeboJwtConfigureProperties jwtProperties;

    @Value("${nebo.app.basic-auth.secret-key}")
    private String secretKeyToken;

    private final NeboGrpc neboGrpc;

    public boolean validateJwtToken(String authToken) {
        try {
            var claims = Jwts.parser().verifyWith(Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseSignedClaims(authToken).getPayload();
            var userId = claims.get("id", Long.class);
            return !neboGrpc.authenticationService.isBlackListToken(AuthenticationRequest.newBuilder().setToken(authToken).setUserId(userId).build()).getBlock();
        } catch (SignatureException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }

    public AppClient validateApiKey(String apiKey) {
        try {
            var res = neboGrpc.authenticationService.authenticateAppClient(AppClientAuthenticationRequest.newBuilder()
                    .setApiKey(apiKey)
                    .build());
            return new AppClient(res.getId(), res.getName(), res.getUserId(), res.getAccessToken(), res.getScopesList().stream().toList());
        } catch (Exception ex) {

        }
        return null;
    }

    public boolean validateBasicAuthToken(String token) {
        return StringUtils.equals(token, secretKeyToken);
    }

    public UserCredentialResponse getUserCredential(String token) {
        var claims = Jwts.parser().verifyWith(Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(token).getPayload();
        var userId = claims.get("id", Long.class);
        var firstName = claims.get("firstName", String.class);
        var lastName = claims.get("lastName", String.class);
        var permissions = Arrays.stream(StringUtils.split(StringUtils.defaultIfBlank(claims.get("permissions", String.class), ""), ",")).toList();
        return UserCredentialResponse.builder()
                .userId(userId)
                .firstName(firstName)
                .lastName(lastName)
                .permissions(permissions)
                .build();
    }
}
