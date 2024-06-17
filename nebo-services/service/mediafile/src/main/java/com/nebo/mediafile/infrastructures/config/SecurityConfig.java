package com.nebo.mediafile.infrastructures.config;

import com.nebo.shared.security.config.NeboRequestMatcher;
import com.nebo.shared.security.config.NeboSecurityCustomizer;
import com.nebo.shared.security.constant.TokenType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

@Configuration
public class SecurityConfig {
    @Bean
    public NeboSecurityCustomizer defaultNeboSecurityConfig() {
        var filePatternApi = getFilePatternApi();
        var publicPatternApi = getPublicPatternApi();
        return authz -> authz
                .requestMatchers(HttpMethod.GET,publicPatternApi).permitAll()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.cookie_token,filePatternApi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.basic_auth, filePatternApi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.app_client, filePatternApi)).authenticated()
                .anyRequest().denyAll();
    }

    private String[] getPublicPatternApi(){
        return new String[]{
                "/api/files/data/**"
        };
    }

    private String[] getFilePatternApi() {
        return new String[]{
                "/api/files",
                "/api/files/**"
        };
    }

}
