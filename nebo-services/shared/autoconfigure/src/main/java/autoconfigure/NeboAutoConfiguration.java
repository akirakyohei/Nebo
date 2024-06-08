package autoconfigure;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
        DatasourceAutoConfiguration.class,
        Jackson2HttpMessageConverterAutoConfiguration.class
})
@ComponentScan("com.nebo")
public class NeboAutoConfiguration {
}
