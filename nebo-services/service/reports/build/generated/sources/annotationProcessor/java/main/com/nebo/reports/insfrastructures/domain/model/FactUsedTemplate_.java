package com.nebo.reports.insfrastructures.domain.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(FactUsedTemplate.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class FactUsedTemplate_ {

	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactUsedTemplate#totalUsed
	 **/
	public static volatile SingularAttribute<FactUsedTemplate, Long> totalUsed;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactUsedTemplate#dateKey
	 **/
	public static volatile SingularAttribute<FactUsedTemplate, Long> dateKey;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactUsedTemplate#id
	 **/
	public static volatile SingularAttribute<FactUsedTemplate, Long> id;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactUsedTemplate
	 **/
	public static volatile EntityType<FactUsedTemplate> class_;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactUsedTemplate#userKey
	 **/
	public static volatile SingularAttribute<FactUsedTemplate, Long> userKey;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactUsedTemplate#templateKey
	 **/
	public static volatile SingularAttribute<FactUsedTemplate, Long> templateKey;

	public static final String TOTAL_USED = "totalUsed";
	public static final String DATE_KEY = "dateKey";
	public static final String ID = "id";
	public static final String USER_KEY = "userKey";
	public static final String TEMPLATE_KEY = "templateKey";

}

