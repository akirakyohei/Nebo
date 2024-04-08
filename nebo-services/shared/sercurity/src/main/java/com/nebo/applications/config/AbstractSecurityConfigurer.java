package com.nebo.applications.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.RequestMatcher;

public abstract class AbstractSecurityConfigurer {

    public AppClientHttpConfigurer getAppClientHttpConfigurer() {
        return new AppClientHttpConfigurer();
    }

    public BasicAuthHttpConfigurer getBasicAuthHttpConfigurer() {
        return new BasicAuthHttpConfigurer();
    }

    public JwtHttpConfigurer getJwtHttpConfigurer() {
        return new JwtHttpConfigurer();
    }

    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        RequestMatcher requestMatcher= (q,e)->{
            q.changeSessionId()
        };
        return http.with(getBasicAuthHttpConfigurer(), cus -> {

                })
                .with()
                .with()
                .build();
    }


}
