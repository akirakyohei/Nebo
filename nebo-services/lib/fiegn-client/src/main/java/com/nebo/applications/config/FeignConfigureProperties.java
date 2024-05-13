package com.nebo.applications.config;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Setter
@Getter
public class FeignConfigureProperties {
    @JsonProperty("secret_key")
    private String secretKey;
}
