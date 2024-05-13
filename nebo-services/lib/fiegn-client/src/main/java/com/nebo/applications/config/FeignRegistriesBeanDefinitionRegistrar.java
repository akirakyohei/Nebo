package com.nebo.applications.config;

import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.context.annotation.ImportBeanDefinitionRegistrar;
import org.springframework.core.type.AnnotationMetadata;

import java.util.Map;

public class FeignRegistriesBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar {
    @Override
    public void registerBeanDefinitions(AnnotationMetadata annotationMetadata, BeanDefinitionRegistry registry) {
        Map attrs = annotationMetadata.getAnnotationAttributes(EnableNeboFeignClients.class.getName(),
                true);
        Class[] clients = attrs == null ? null : (Class[]) attrs.get("clients");
    }
}
