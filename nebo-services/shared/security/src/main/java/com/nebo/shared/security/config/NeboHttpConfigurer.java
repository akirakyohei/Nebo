package com.nebo.shared.security.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.nebo.shared.security.filters.AppClientAuthenticationFilter;
import com.nebo.shared.security.filters.BasicAuthenticationFilter;
import com.nebo.shared.security.filters.JwtAuthenticationFilter;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.ApplicationContext;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Map;

public class NeboHttpConfigurer extends AbstractHttpConfigurer<NeboHttpConfigurer, HttpSecurity> {

    @Override
    public void init(HttpSecurity http) throws Exception {
        http.cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable);
        super.init(http);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        var context = http.getSharedObject(ApplicationContext.class);
        var jwtFilter = context.getBean(JwtAuthenticationFilter.class);
        var basicAuthFilter = context.getBean(BasicAuthenticationFilter.class);
        var appClientFilter = context.getBean(AppClientAuthenticationFilter.class);
        http.addFilterBefore(basicAuthFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(appClientFilter, BasicAuthenticationFilter.class);
        http.addFilterBefore(jwtFilter, AppClientAuthenticationFilter.class);
        http.sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.exceptionHandling(customizer -> customizer.accessDeniedHandler(new AccessDeniedHandler() {
            @Override
            public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
                var objectMapper = new ObjectMapper();
                objectMapper.setPropertyNamingStrategy(PropertyNamingStrategy.CAMEL_CASE_TO_LOWER_CASE_WITH_UNDERSCORES);
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write(objectMapper.writeValueAsString(Map.of("error", Map.of("access_denied", accessDeniedException.getMessage()))));
            }
        }));
    }
}
