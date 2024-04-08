package com.nebo.applications.config;

import com.nebo.applications.filters.BasicAuthenticationFilter;
import org.springframework.context.ApplicationContext;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class BasicAuthHttpConfigurer extends AbstractHttpConfigurer<JwtHttpConfigurer, HttpSecurity> {

    @Override
    public void init(HttpSecurity http) throws Exception {
        http.cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable);
        super.init(http);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        var context = http.getSharedObject(ApplicationContext.class);
        var filter = context.getBean(BasicAuthenticationFilter.class);
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
    }
}
