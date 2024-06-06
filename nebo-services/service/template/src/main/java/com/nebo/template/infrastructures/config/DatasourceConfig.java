package com.nebo.template.infrastructures.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateProperties;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateSettings;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.persistenceunit.PersistenceUnitManager;
import org.springframework.orm.jpa.vendor.AbstractJpaVendorAdapter;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.Map;

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
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryBean(@Qualifier("templateDatasource") DataSource dataSource, final ObjectProvider<PersistenceUnitManager> persistenceUnitManagerProvider, JpaProperties jpaProperties,
                                                                           HibernateProperties hibernateProperties) {
        return createEntityManagerFactoryBuilder(persistenceUnitManagerProvider.getIfAvailable(), jpaProperties, hibernateProperties)
                .dataSource(dataSource)
                .packages("com.nebo.template")
                .build();
    }

    @Bean("templateTransactionManager")
    public PlatformTransactionManager transactionManager(@Qualifier("templateEntityManagerFactory") LocalContainerEntityManagerFactoryBean lef) {
        var transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(lef.getObject());
        return transactionManager;
    }

    @Bean("templateNamedParameterJdbcTemplate")
    public NamedParameterJdbcTemplate namedParameterJdbcTemplate(){
        return new NamedParameterJdbcTemplate(dataSource());
    }


    private static EntityManagerFactoryBuilder createEntityManagerFactoryBuilder(
            final PersistenceUnitManager persistenceUnitManager, final JpaProperties jpaProperties, final HibernateProperties hibernateProperties) {
        final JpaVendorAdapter jpaVendorAdapter = createJpaVendorAdapter(jpaProperties);
        final Map<String, Object> expandedProperties = hibernateProperties.determineHibernateProperties(jpaProperties.getProperties(), new HibernateSettings());
        return new EntityManagerFactoryBuilder(jpaVendorAdapter, expandedProperties, persistenceUnitManager);
    }

    private static JpaVendorAdapter createJpaVendorAdapter(final JpaProperties jpaProperties) {
        final AbstractJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
        adapter.setShowSql(jpaProperties.isShowSql());
        adapter.setDatabasePlatform(jpaProperties.getDatabasePlatform());
        adapter.setGenerateDdl(jpaProperties.isGenerateDdl());
        if (jpaProperties.getDatabase() != null) {
            adapter.setDatabase(jpaProperties.getDatabase());
        }
        return adapter;
    }
}
