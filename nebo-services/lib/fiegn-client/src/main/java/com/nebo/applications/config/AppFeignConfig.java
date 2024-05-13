package com.nebo.applications.config;

import feign.Feign;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor;
import org.springframework.beans.factory.support.RootBeanDefinition;
import org.springframework.boot.context.properties.bind.Bindable;
import org.springframework.boot.context.properties.bind.Binder;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.util.Map;

@Configuration
public class AppFeignConfig implements BeanDefinitionRegistryPostProcessor, EnvironmentAware {
    private Environment environment;
    private FeignConfigureProperties config;

    private BeanDefinition createBeanDefination(Object client) {
        var definition = new RootBeanDefinition();
        definition.setBeanClass(client.getClass());
        definition.setInstanceSupplier(() -> client);

        return definition;
    }

    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) throws BeansException {
        this.config = Binder.get(this.environment)
                .bind("nebo.feign", Bindable.of(FeignConfigureProperties.class))
                .orElseThrow(IllegalStateException::new);

        // init builder
        var feignClient = Feign.builder().build();

        registry.registerBeanDefinition("neboClient", createBeanDefination(feignClient));
    }

    @Override
    public void setEnvironment(Environment environment) {
        this.environment = environment;
    }
}
