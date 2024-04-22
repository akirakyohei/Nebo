package com.nebo.reports.insfrastructures.domain.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.Instant;

@StaticMetamodel(DimTemplate.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class DimTemplate_ {

	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimTemplate#getName
	 **/
	public static volatile SingularAttribute<DimTemplate, String> name;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimTemplate#getUpdatedOn
	 **/
	public static volatile SingularAttribute<DimTemplate, Instant> updatedOn;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimTemplate#getTemplateId
	 **/
	public static volatile SingularAttribute<DimTemplate, Long> templateId;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimTemplate
	 **/
	public static volatile EntityType<DimTemplate> class_;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimTemplate#getCreatedOn
	 **/
	public static volatile SingularAttribute<DimTemplate, Instant> createdOn;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimTemplate#getUserKey
	 **/
	public static volatile SingularAttribute<DimTemplate, Long> userKey;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimTemplate#getTemplateKey
	 **/
	public static volatile SingularAttribute<DimTemplate, Long> templateKey;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimTemplate#getPaperTypeKey
	 **/
	public static volatile SingularAttribute<DimTemplate, Integer> paperTypeKey;

	public static final String NAME = "name";
	public static final String UPDATED_ON = "updatedOn";
	public static final String TEMPLATE_ID = "templateId";
	public static final String CREATED_ON = "createdOn";
	public static final String USER_KEY = "userKey";
	public static final String TEMPLATE_KEY = "templateKey";
	public static final String PAPER_TYPE_KEY = "paperTypeKey";

}

