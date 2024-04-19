package com.nebo.mediafile.insfrastructures.config;

import com.google.j2objc.annotations.Property;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Setter
@Getter
@Configuration
@ConfigurationProperties(prefix = "nebo.mediafile.minio")
public class MinioConfigurerProperties {
    private String url;
    private String bucket;
    @Property("access_key")
    private String accessKey;
    @Property("secret_key")
    private String secretKey;
}
