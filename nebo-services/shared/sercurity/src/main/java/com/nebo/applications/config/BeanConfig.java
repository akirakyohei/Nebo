package com.nebo.applications.config;

import com.nebo.applications.constant.TokenType;
import com.nebo.applications.filters.AppClientAuthenticationFilter;
import com.nebo.applications.filters.BasicAuthenticationFilter;
import com.nebo.applications.filters.JwtAuthenticationFilter;
import com.nebo.applications.providers.AppClientAuthenticationProvider;
import com.nebo.applications.providers.BasicAuthenticationProvider;
import com.nebo.applications.providers.JwtAuthenticationProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class BeanConfig {

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(authenticationManager());
    }

    @Bean
    public BasicAuthenticationFilter basicAuthenticationFilter() {
        return new BasicAuthenticationFilter(authenticationManager());
    }

    @Bean
    public AppClientAuthenticationFilter appClientAuthenticationFilter() {
        return new AppClientAuthenticationFilter(authenticationManager());
    }


    @Bean
    public AuthenticationManager authenticationManager() {
        var jwtAuthenticationProvider = new JwtAuthenticationProvider();
        var basicAuthenticationProvider = new BasicAuthenticationProvider();
        var appClientAuthenticationProvider = new AppClientAuthenticationProvider();
        return new ProviderManager(jwtAuthenticationProvider, basicAuthenticationProvider, appClientAuthenticationProvider);
    }

    @Bean
    @ConditionalOnMissingBean(NeboSecurityCustomizer.class)
    public NeboSecurityCustomizer defaultNeboSecurityConfig() {
        return authz -> authz.requestMatchers(NeboRequestMatcher.matcher(TokenType.cookie_token)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.basic_auth)).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.app_client)).authenticated()
                .anyRequest().denyAll();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, NeboSecurityCustomizer neboSecurityCustomizer) throws Exception {
        http.with(new NeboHttpConfigurer(), cus -> {
        }).authorizeHttpRequests(neboSecurityCustomizer::configure);
        return http.build();
    }
}
