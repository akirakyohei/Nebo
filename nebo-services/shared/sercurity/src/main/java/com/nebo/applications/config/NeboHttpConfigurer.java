package com.nebo.applications.config;

import com.nebo.applications.filters.AppClientAuthenticationFilter;
import com.nebo.applications.filters.BasicAuthenticationFilter;
import com.nebo.applications.filters.JwtAuthenticationFilter;
import org.springframework.context.ApplicationContext;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
    }
}
