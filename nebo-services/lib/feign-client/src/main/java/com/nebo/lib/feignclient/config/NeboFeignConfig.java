package com.nebo.lib.feignclient.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import feign.*;
import feign.codec.Decoder;
import feign.codec.Encoder;
import feign.codec.ErrorDecoder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor;
import org.springframework.beans.factory.support.RootBeanDefinition;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.boot.context.properties.bind.Bindable;
import org.springframework.boot.context.properties.bind.Binder;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.support.ResponseEntityDecoder;
import org.springframework.cloud.openfeign.support.SpringDecoder;
import org.springframework.cloud.openfeign.support.SpringEncoder;
import org.springframework.cloud.openfeign.support.SpringMvcContract;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.util.AnnotatedTypeScanner;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import java.util.Map;
import java.util.concurrent.TimeUnit;

@Configuration
public class NeboFeignConfig implements BeanDefinitionRegistryPostProcessor, ResourceLoaderAware, EnvironmentAware {

    @Value("${nebo.app.basic_auth.secret_key}")
    private String secretKeyToken;
    private Environment environment;
    private ResourceLoader resourceLoader;

    private FeignConfigureProperties config;

    private BeanDefinition createBeanDefination(Object client) {
        var definition = new RootBeanDefinition();
        definition.setBeanClass(client.getClass());
        definition.setInstanceSupplier(() -> client);

        return definition;
    }

    private ObjectMapper createObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(DeserializationFeature.USE_BIG_DECIMAL_FOR_FLOATS, true);
        objectMapper.setPropertyNamingStrategy(PropertyNamingStrategy.CAMEL_CASE_TO_LOWER_CASE_WITH_UNDERSCORES);
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        objectMapper.registerModule(new JavaTimeModule());
        return objectMapper;
    }

    @Bean
    public RequestInterceptor requestInterceptor() {
        return (requestTemplate) -> {
            requestTemplate.header("Authorization", secretKeyToken);
        };
    }

    @Bean
    Contract springMvcContract() {
        var contact = new SpringMvcContract();
        contact.setResourceLoader(this.resourceLoader);
        return contact;
    }

    @Bean
    Encoder feignEncoder() {
        var jsonConverter = new MappingJackson2HttpMessageConverter();
        var objectMapper = createObjectMapper();
        jsonConverter.setObjectMapper(objectMapper);
        return new SpringEncoder(() -> new HttpMessageConverters(jsonConverter));
    }

    @Bean
    Decoder feignDecoder() {
        var jsonConverter = new MappingJackson2HttpMessageConverter();
        var objectMapper = createObjectMapper();
        jsonConverter.setObjectMapper(objectMapper);
        return new ResponseEntityDecoder(new SpringDecoder(() -> new HttpMessageConverters(jsonConverter)));
    }

    @Bean
    Retryer retryer() {
        return new Retryer.Default();
    }

    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) throws BeansException {
        this.config = Binder.get(this.environment)
                .bind("nebo.feign", Bindable.of(FeignConfigureProperties.class))
                .orElseThrow(IllegalStateException::new);
        this.secretKeyToken = Binder.get(this.environment)
                .bind("nebo.app.basic-auth.secret-key", Bindable.of(String.class))
                .orElseThrow(IllegalStateException::new);
        // init builder
        var annotatedTypeScanner = new AnnotatedTypeScanner(FeignClient.class);
        var candidateClients = annotatedTypeScanner.findTypes("com.nebo.lib.feignclient");

        candidateClients.forEach(candidateClient -> {
            FeignClient annotation = candidateClient.getAnnotation(FeignClient.class);
            if (true) { // check if client name matches config name
                var clientConfig = config;
                var feignClient = Feign.builder()
                        .contract(springMvcContract())
                        .requestInterceptor(requestInterceptor())
                        .encoder(feignEncoder())
                        .decoder(feignDecoder())
                        .options(new Request.Options(clientConfig.getConnectTimeout(), TimeUnit.MILLISECONDS, clientConfig.getReadTimeout(), TimeUnit.MILLISECONDS, true))
                        .errorDecoder((methodKey, response) -> {
                            FeignException exception = FeignException.errorStatus(methodKey, response);
                            int status = response.status();
                            if (config.getRetry().getRetryCodes().contains(status)) {
                                return new RetryableException(
                                        response.status(),
                                        exception.getMessage(),
                                        response.request().httpMethod(),
                                        exception,
                                        (Long) null,
                                        response.request());
                            }
                            return exception;
                        })
                        .retryer(new Retryer.Default(clientConfig.getRetry().getPeriod(), clientConfig.getRetry().getMaxPeriod(), clientConfig.getRetry().getMaxAttempts()))
                        .target(candidateClient, clientConfig.getUrl());

                var clientName = String.format("%sClient", candidateClient.getName());
                registry.registerBeanDefinition(clientName, createBeanDefination(feignClient));
            }
        });
    }

    @Override
    public void setEnvironment(Environment environment) {
        this.environment = environment;
    }

    @Override
    public void setResourceLoader(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }
}
