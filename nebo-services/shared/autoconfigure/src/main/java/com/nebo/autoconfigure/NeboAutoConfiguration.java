package com.nebo.autoconfigure;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
        DatasourceAutoConfiguration.class,
        Jackson2HttpMessageConverterAutoConfiguration.class
})
public class NeboAutoConfiguration {
}
