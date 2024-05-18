package com.nebo.autoconfigure;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.nebo.web.applications.bind.ParamNameServletModelAttributeResolver;
import com.nebo.web.applications.bind.UserIdArgumentResolver;
import com.nebo.web.applications.utils.JsonUtils;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.xml.Jaxb2RootElementHttpMessageConverter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.mvc.method.annotation.RequestResponseBodyMethodProcessor;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class Jackson2HttpMessageConverterAutoConfiguration implements WebMvcConfigurer {

    @Bean
    @Primary
    public ObjectMapper objectMapper() {
        return JsonUtils.createObjectMapper();
    }

    @Bean("jackson2WithRootNameHttpMessageConverter")
    public MappingJackson2HttpMessageConverter mappingJackson2WithRootNameHttpMessageConverter() {
        var jsonConverter = new MappingJackson2WithRootNameHttpMessageConverter();
        var objectMapper = JsonUtils.createObjectMapper()
                .enable(SerializationFeature.WRAP_ROOT_VALUE)
                .enable(DeserializationFeature.UNWRAP_ROOT_VALUE);
        jsonConverter.setObjectMapper(objectMapper);
        return jsonConverter;
    }

    @Bean("jackson2WithoutRootNameHttpMessageConverter")
    public MappingJackson2HttpMessageConverter mappingJackson2WithoutRootNameHttpMessageConverter() {
        var jsonConverter = new MappingJackson2WithoutRootNameHttpMessageConverter();
        var objectMapper = JsonUtils.createObjectMapper();
        jsonConverter.setObjectMapper(objectMapper);
        return jsonConverter;
    }

    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(mappingJackson2WithRootNameHttpMessageConverter());
        converters.add(mappingJackson2WithoutRootNameHttpMessageConverter());
    }

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        WebMvcConfigurer.super.configurePathMatch(configurer);
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new ParamNameServletModelAttributeResolver(false));
        resolvers.add(new UserIdArgumentResolver());
        WebMvcConfigurer.super.addArgumentResolvers(resolvers);
    }

    @Override
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
        WebMvcConfigurer.super.configureHandlerExceptionResolvers(resolvers);
    }


    @Override
    public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> handlers) {
        List<HttpMessageConverter<?>> messageConverters = new ArrayList<>();
        messageConverters.add(mappingJackson2WithoutRootNameHttpMessageConverter());
        messageConverters.add(mappingJackson2WithRootNameHttpMessageConverter());
        handlers.add(new RequestResponseBodyMethodProcessor(messageConverters));
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedHeaders("*")
                .allowedMethods("*")
                .allowCredentials(false);
    }
}
