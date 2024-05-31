package com.nebo.lib.feignclient.config;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Setter
@Getter
public class FeignConfigureProperties {
    private String url;
    private System.Logger.Level loggerLevel;
    private Integer connectTimeout;
    private Integer readTimeout;
    private NeboRetryConfigureProperties retry;
}
