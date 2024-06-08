package com.nebo.lib.feignclient.config;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FeignConfigureProperties {
    private String url;
    private System.Logger.Level loggerLevel;
    private Integer connectTimeout;
    private Integer readTimeout;
    private NeboRetryConfigureProperties retry;
}
