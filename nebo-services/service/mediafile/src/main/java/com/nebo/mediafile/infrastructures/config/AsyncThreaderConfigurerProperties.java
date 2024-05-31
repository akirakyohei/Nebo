package com.nebo.mediafile.infrastructures.config;

import com.google.j2objc.annotations.Property;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "nebo.mediafile.threader-pool")
public class AsyncThreaderConfigurerProperties {
    @Property("core_pool_size")
    private int corePoolSize;
    @Property("max_pool_size")
    private int maxPoolSize;
    @Property("queue_capacity")
    private int queueCapacity;
    @Property("thread_name_prefix")
    private String threadNamePrefix;
    @Property("wait_for_tasks_to_compile_on_shutdown")
    private Boolean waitForTasksToCompileOnShutdown;
}
