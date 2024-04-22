package com.nebo.reports.insfrastructures.domain.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(FactAggregate.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class FactAggregate_ {

	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactAggregate#totalTemplate
	 **/
	public static volatile SingularAttribute<FactAggregate, Long> totalTemplate;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactAggregate#totalData
	 **/
	public static volatile SingularAttribute<FactAggregate, Long> totalData;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactAggregate#id
	 **/
	public static volatile SingularAttribute<FactAggregate, Long> id;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactAggregate
	 **/
	public static volatile EntityType<FactAggregate> class_;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactAggregate#totalUsedTemplate
	 **/
	public static volatile SingularAttribute<FactAggregate, Long> totalUsedTemplate;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactAggregate#userKey
	 **/
	public static volatile SingularAttribute<FactAggregate, Long> userKey;

	public static final String TOTAL_TEMPLATE = "totalTemplate";
	public static final String TOTAL_DATA = "totalData";
	public static final String ID = "id";
	public static final String TOTAL_USED_TEMPLATE = "totalUsedTemplate";
	public static final String USER_KEY = "userKey";

}

