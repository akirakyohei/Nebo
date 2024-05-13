package com.nebo.template.infrastructures.domain.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.Instant;

@StaticMetamodel(PrintLog.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class PrintLog_ {

	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.PrintLog#paperTypeId
	 **/
	public static volatile SingularAttribute<PrintLog, Long> paperTypeId;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.PrintLog#id
	 **/
	public static volatile SingularAttribute<PrintLog, Long> id;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.PrintLog#templateId
	 **/
	public static volatile SingularAttribute<PrintLog, Long> templateId;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.PrintLog
	 **/
	public static volatile EntityType<PrintLog> class_;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.PrintLog#userId
	 **/
	public static volatile SingularAttribute<PrintLog, Long> userId;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.PrintLog#createdOn
	 **/
	public static volatile SingularAttribute<PrintLog, Instant> createdOn;

	public static final String PAPER_TYPE_ID = "paperTypeId";
	public static final String ID = "id";
	public static final String TEMPLATE_ID = "templateId";
	public static final String USER_ID = "userId";
	public static final String CREATED_ON = "createdOn";

}

