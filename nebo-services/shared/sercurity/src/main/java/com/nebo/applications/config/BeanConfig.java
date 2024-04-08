package com.nebo.applications.config;

import com.nebo.applications.filters.AppClientAuthenticationFilter;
import com.nebo.applications.filters.BasicAuthenticationFilter;
import com.nebo.applications.filters.JwtAuthenticationFilter;
import com.nebo.applications.providers.AppClientAuthenticationProvider;
import com.nebo.applications.providers.BasicAuthenticationProvider;
import com.nebo.applications.providers.JwtAuthenticationProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;

@Configuration
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
        var authenticationManager = new ProviderManager(jwtAuthenticationProvider, basicAuthenticationProvider, appClientAuthenticationProvider);
        return authenticationManager;
    }

}
