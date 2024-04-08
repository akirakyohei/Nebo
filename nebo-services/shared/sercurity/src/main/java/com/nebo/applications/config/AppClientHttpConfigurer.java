package com.nebo.applications.config;

import com.nebo.applications.constant.TokenType;
import com.nebo.applications.filters.AppClientAuthenticationFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.autoconfigure.security.servlet.RequestMatcherProvider;
import org.springframework.context.ApplicationContext;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcherEntry;

public class AppClientHttpConfigurer extends AbstractHttpConfigurer<JwtHttpConfigurer, HttpSecurity> {

    @Override
    public void init(HttpSecurity http) throws Exception {
        http.cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable);
        super.init(http);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        var context = http.getSharedObject(ApplicationContext.class);
        var filter = context.getBean(AppClientAuthenticationFilter.class);

        http.authorizeHttpRequests(cus->cus.requestMatchers())
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
    }
}
