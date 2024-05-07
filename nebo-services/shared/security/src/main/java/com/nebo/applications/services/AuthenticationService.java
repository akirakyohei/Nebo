package com.nebo.applications.services;

import org.apache.commons.lang3.StringUtils;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class AuthenticationService {
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().verifyWith(Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parse(authToken);
            return true;
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

    public UserCredentialResponse getUserCredential(String token) {
        var claims = Jwts.parser()
                .decryptWith(Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes(StandardCharsets.UTF_8)))
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
