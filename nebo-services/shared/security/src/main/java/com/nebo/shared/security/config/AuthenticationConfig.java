package com.nebo.shared.security.config;

import com.nebo.shared.security.constant.TokenType;
import com.nebo.shared.security.filters.AppClientAuthenticationFilter;
import com.nebo.shared.security.filters.BasicAuthenticationFilter;
import com.nebo.shared.security.filters.JwtAuthenticationFilter;
import com.nebo.shared.security.providers.AppClientAuthenticationProvider;
import com.nebo.shared.security.providers.BasicAuthenticationProvider;
import com.nebo.shared.security.providers.JwtAuthenticationProvider;
import com.nebo.shared.security.services.AuthenticationService;
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
public class AuthenticationConfig {

    private final AuthenticationService authenticationService;


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
        var jwtAuthenticationProvider = new JwtAuthenticationProvider(authenticationService);
        var basicAuthenticationProvider = new BasicAuthenticationProvider(authenticationService);
        var appClientAuthenticationProvider = new AppClientAuthenticationProvider(authenticationService);
        return new ProviderManager(jwtAuthenticationProvider, basicAuthenticationProvider, appClientAuthenticationProvider);
    }

    @Bean
    @ConditionalOnMissingBean(NeboSecurityCustomizer.class)
    public NeboSecurityCustomizer defaultNeboSecurityConfig() {
        return authz -> authz.requestMatchers(NeboRequestMatcher.matcher(TokenType.cookie_token, "/**")).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.basic_auth, "/**")).authenticated()
                .requestMatchers(NeboRequestMatcher.matcher(TokenType.app_client, "/**")).authenticated()
                .anyRequest().denyAll();
    }


    @Bean
    @ConditionalOnMissingBean(NeboHttpConfigurerCustomizer.class)
    public NeboHttpConfigurerCustomizer defaultNeboHttpConfigurer() {
        return http -> {
        };
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, NeboHttpConfigurerCustomizer neboHttpConfigurerCustomizer, NeboSecurityCustomizer neboSecurityCustomizer) throws Exception {
        http.with(new NeboHttpConfigurer(), cus -> {
            try {
                neboHttpConfigurerCustomizer.configure(http);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).authorizeHttpRequests(neboSecurityCustomizer::getConfigure);
        return http.build();
    }
}
