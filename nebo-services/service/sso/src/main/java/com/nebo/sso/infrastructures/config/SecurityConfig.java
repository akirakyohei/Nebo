package com.nebo.sso.infrastructures.config;

import com.nebo.shared.security.config.NeboRequestMatcher;
import com.nebo.shared.security.config.NeboSecurityCustomizer;
import com.nebo.shared.security.constant.TokenType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfig {

    @Bean
    public NeboSecurityCustomizer defaultNeboSecurityConfig() {
        var authPatternApi = getAuthPatternApi();
        var userPatternApi = getUserPatternApi();
        var apiAppPatternApi = getApiAppPatternApi();
        var internalUserPatternAPi = getInternalUserPatternApi();
        return authz -> authz
                .requestMatchers(authPatternApi).permitAll()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.cookie_token, internalUserPatternAPi)).denyAll()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.basic_auth, internalUserPatternAPi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.app_client, internalUserPatternAPi)).denyAll()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.cookie_token, userPatternApi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.basic_auth, userPatternApi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.app_client, userPatternApi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.cookie_token, apiAppPatternApi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.basic_auth, apiAppPatternApi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.app_client, apiAppPatternApi)).authenticated()

                .anyRequest().denyAll();
    }

    private String[] getAuthPatternApi() {
        return new String[]{
                "/api/auth/signup",
                "/api/auth/signin",
                "/api/auth/refresh_token"
        };
    }

    private String[] getInternalUserPatternApi() {
        return new String[]{
                "/api/users/{id::\\\\d+}"
        };
    }

    private String[] getUserPatternApi() {
        return new String[]{
                "/api/users/**"
        };
    }

    private String[] getApiAppPatternApi() {
        return new String[]{
                "/api/api_apps/**"
        };
    }
}
