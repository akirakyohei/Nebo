package com.nebo.reports.insfrastructures.domain.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(FactUsedPaperType.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class FactUsedPaperType_ {

	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactUsedPaperType#totalUsed
	 **/
	public static volatile SingularAttribute<FactUsedPaperType, Long> totalUsed;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactUsedPaperType#dateKey
	 **/
	public static volatile SingularAttribute<FactUsedPaperType, Long> dateKey;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactUsedPaperType#id
	 **/
	public static volatile SingularAttribute<FactUsedPaperType, Long> id;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactUsedPaperType
	 **/
	public static volatile EntityType<FactUsedPaperType> class_;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactUsedPaperType#userKey
	 **/
	public static volatile SingularAttribute<FactUsedPaperType, Long> userKey;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactUsedPaperType#paperTypeKey
	 **/
	public static volatile SingularAttribute<FactUsedPaperType, Integer> paperTypeKey;

	public static final String TOTAL_USED = "totalUsed";
	public static final String DATE_KEY = "dateKey";
	public static final String ID = "id";
	public static final String USER_KEY = "userKey";
	public static final String PAPER_TYPE_KEY = "paperTypeKey";

}

