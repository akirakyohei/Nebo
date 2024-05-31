package com.nebo.lib.feignclient.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

import java.util.List;

@Setter
@Getter
public class NeboRetryConfigureProperties {
    private Integer maxAttempts;
    private Long period;
    private Long maxPeriod;
    private List<Integer> retryCodes = List.of(500, 502, 504);
}
