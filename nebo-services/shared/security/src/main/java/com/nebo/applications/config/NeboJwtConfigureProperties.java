package com.nebo.applications.config;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Setter
@Getter
@Configuration
@ConfigurationProperties(prefix = "nebo.app.jwt")
public class NeboJwtConfigureProperties {
    @JsonProperty("header_token")
    private String headerToken;
    @JsonProperty("header_refresh_token")
    private String headerRefreshToken;
    @JsonProperty("secret_key")
    private String secretKey;
    private long expiration;
    @JsonProperty("refresh_expiration")
    private long refreshExpiration;
}
