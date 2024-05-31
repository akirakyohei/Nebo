package com.nebo.mediafile.infrastructures.config;

import io.minio.MinioClient;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
@RequiredArgsConstructor
public class MinioConfig {

    private final MinioConfigurerProperties minioConfigurerProperties;

    @Bean
    @Primary
    public MinioClient minionClient() {
        return new MinioClient.Builder()
                .credentials(minioConfigurerProperties.getAccessKey(), minioConfigurerProperties.getSecretKey())
                .endpoint(minioConfigurerProperties.getUrl())
                .build();
    }
}
