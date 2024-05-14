package com.nebo.sso.infrastructures.config;

import com.nebo.applications.config.NeboRequestMatcher;
import com.nebo.applications.config.NeboSecurityCustomizer;
import com.nebo.applications.constant.TokenType;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfig {

    @Bean
    public NeboSecurityCustomizer defaultNeboSecurityConfig() {
        var authPatternApi = getAuthPatternApi();
        return authz -> authz
                .requestMatchers(authPatternApi).permitAll()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.cookie_token, "/*")).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.basic_auth, "/*")).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.app_client, "/*")).authenticated()
                .anyRequest().denyAll();
    }

    private String[] getAuthPatternApi() {
        return new String[]{
                "/api/auth/signup",
                "/api/auth/signin",
                "/api/auth/refresh_token"
        };
    }
}
