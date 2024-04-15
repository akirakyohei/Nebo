package com.nebo.template.infrastructures.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

@Configuration
@EntityScan(basePackages = "com.nebo.template.infrastructures")
@EnableJpaRepositories(basePackages = {"com.nebo.template.infrastructures.domain.repository"},
        transactionManagerRef = "templateTransactionManager",
        entityManagerFactoryRef = "templateEntityManagerFactory")
public class DatasourceConfig {
    @Bean("templateDatasource")
    @ConfigurationProperties(prefix = "spring.datasource-templatedb")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean("templateEntityManagerFactory")
    @Primary
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryBean() {
        var em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource());
        em.setPackagesToScan("com.nebo");
        var vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        return em;
    }

    @Bean("templateTransactionManager")
    @Primary
    public PlatformTransactionManager transactionManager() {
        var transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactoryBean().getObject());
        return transactionManager;
    }

    @Bean
    public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
        return new PersistenceExceptionTranslationPostProcessor();
    }
}
