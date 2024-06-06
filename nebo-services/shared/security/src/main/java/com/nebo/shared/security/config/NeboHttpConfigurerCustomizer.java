package com.nebo.shared.security.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@FunctionalInterface
public interface NeboHttpConfigurerCustomizer {
    void configure(HttpSecurity http) throws Exception;
}
