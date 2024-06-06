package com.nebo.sso.infrastructures.config;

import com.nebo.shared.security.config.NeboHttpConfigurerCustomizer;
import com.nebo.shared.security.config.NeboRequestMatcher;
import com.nebo.shared.security.config.NeboSecurityCustomizer;
import com.nebo.shared.security.constant.TokenType;
import com.nebo.sso.applications.services.oauth2.CustomOAuth2UserService;
import com.nebo.sso.applications.services.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.nebo.sso.applications.services.oauth2.OAuth2AuthenticationFailureHandler;
import com.nebo.sso.applications.services.oauth2.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Bean
    public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }

    @Bean
    NeboHttpConfigurerCustomizer neboHttpConfigurerCustomizer() {
        return http -> http.oauth2Login(httpSecurityOAuth2LoginConfigurer -> httpSecurityOAuth2LoginConfigurer.authorizationEndpoint(
                        authorizationEndpointConfig -> authorizationEndpointConfig.baseUri("/api/auth/oauth2")
                                .authorizationRequestRepository(cookieAuthorizationRequestRepository())
                )
                .redirectionEndpoint(redirectionEndpointConfig -> redirectionEndpointConfig.baseUri("/api/auth/oauth2/callback/*"))
                .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig.userService(customOAuth2UserService))
                .successHandler(oAuth2AuthenticationSuccessHandler)
                .failureHandler(oAuth2AuthenticationFailureHandler));
    }

    @Bean
    public NeboSecurityCustomizer defaultNeboSecurityConfig() {
        var authPatternApi = getAuthPatternApi();
        var userPatternApi = getUserPatternApi();
        var apiAppPatternApi = getApiAppPatternApi();
        var internalUserPatternApi = getInternalUserPatternApi();
        var authenticatedCookiePatternApi = getAuthenticatedCookiePatternApi();
        return authz -> authz
                .requestMatchers(authPatternApi).permitAll()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.cookie_token, authenticatedCookiePatternApi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.basic_auth, authenticatedCookiePatternApi)).denyAll()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.app_client, authenticatedCookiePatternApi)).denyAll()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.cookie_token, internalUserPatternApi)).denyAll()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.basic_auth, internalUserPatternApi)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.app_client, internalUserPatternApi)).denyAll()
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

    private String[] getAuthenticatedCookiePatternApi() {
        return new String[]{
                "/api/auth/logout",
        };
    }

    private String[] getInternalUserPatternApi() {
        return new String[]{
                "/api/users/{id:\\d+}"
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
