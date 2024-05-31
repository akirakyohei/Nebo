package com.nebo.mediafile.infrastructures.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Setter
@Getter
@Configuration
@ConfigurationProperties(prefix = "nebo.mediafile.file")
public class FileTypeWhitelistConfigurerProperties {
    private List<String> extensions;
}
