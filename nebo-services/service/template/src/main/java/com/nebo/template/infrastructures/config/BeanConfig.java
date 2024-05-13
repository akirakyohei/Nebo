package com.nebo.template.infrastructures.config;

import com.nebo.grpc.NeboGrpc;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public NeboGrpc neboGrpc(@Value("${spring.grpc.url}") String url) {
        return NeboGrpc.builder()
                .url(url)
                .build();
    }
}
