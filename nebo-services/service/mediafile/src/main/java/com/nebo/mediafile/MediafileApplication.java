package com.nebo.mediafile;

import com.nebo.shared.autoconfigure.NeboAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(NeboAutoConfiguration.class)
@EnableConfigurationProperties
public class MediafileApplication {

    public static void main(String[] args) {
        SpringApplication.run(MediafileApplication.class, args);
    }

}
