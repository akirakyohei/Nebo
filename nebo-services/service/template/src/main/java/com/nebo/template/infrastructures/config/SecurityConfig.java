package com.nebo.template.infrastructures.config;

import com.nebo.shared.security.config.NeboRequestMatcher;
import com.nebo.shared.security.config.NeboSecurityCustomizer;
import com.nebo.shared.security.constant.TokenType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfig {
    @Bean
    public NeboSecurityCustomizer defaultNeboSecurityConfig() {
        var templatePatternApi = getTemplatePatternApi();
        var categoryPatternApi = getCategoryPatternApi();
        var publicPatternApi = getPublicPatternApi();
        return authz -> authz
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.cookie_token,publicPatternApi)).permitAll()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.basic_auth, publicPatternApi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.app_client, publicPatternApi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.cookie_token,categoryPatternApi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.basic_auth, categoryPatternApi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.app_client, categoryPatternApi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.cookie_token,templatePatternApi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.basic_auth, templatePatternApi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.app_client, templatePatternApi)).authenticated()
                .anyRequest().denyAll();
    }

    private String[] getPublicPatternApi(){
        return new String[]{
          "/api/paper_types"
        };
    }

    private String[] getTemplatePatternApi() {
        return new String[]{
                "/api/templates",
                "/api/templates/**"
        };
    }

    private String[] getCategoryPatternApi() {
        return new String[]{
                "/api/categories",
                "/api/categories/**",
        };
    }

}
