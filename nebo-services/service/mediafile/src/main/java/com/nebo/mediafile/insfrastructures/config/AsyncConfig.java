package com.nebo.mediafile.insfrastructures.config;

import com.nebo.mediafile.applications.common.handler.AsyncExceptionHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.AsyncConfigurerSupport;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
@RequiredArgsConstructor
public class AsyncConfig implements AsyncConfigurer {
    private final AsyncThreaderConfigurerProperties asyncThreaderConfiguration;

    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(asyncThreaderConfiguration.getCorePoolSize());
        executor.setMaxPoolSize(asyncThreaderConfiguration.getMaxPoolSize());
        executor.setQueueCapacity(asyncThreaderConfiguration.getQueueCapacity());
        executor.setThreadNamePrefix(asyncThreaderConfiguration.getThreadNamePrefix());
        executor.setWaitForTasksToCompleteOnShutdown(asyncThreaderConfiguration.getWaitForTasksToCompileOnShutdown());
        executor.initialize();
        return executor;
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return new AsyncExceptionHandler();
    }
}
