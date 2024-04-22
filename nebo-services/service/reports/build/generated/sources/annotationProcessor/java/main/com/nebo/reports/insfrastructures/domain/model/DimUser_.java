package com.nebo.reports.insfrastructures.domain.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(DimUser.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class DimUser_ {

	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimUser#firstName
	 **/
	public static volatile SingularAttribute<DimUser, String> firstName;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimUser#lastName
	 **/
	public static volatile SingularAttribute<DimUser, String> lastName;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimUser#imageUrl
	 **/
	public static volatile SingularAttribute<DimUser, String> imageUrl;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimUser
	 **/
	public static volatile EntityType<DimUser> class_;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimUser#userId
	 **/
	public static volatile SingularAttribute<DimUser, Long> userId;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimUser#userKey
	 **/
	public static volatile SingularAttribute<DimUser, Long> userKey;

	public static final String FIRST_NAME = "firstName";
	public static final String LAST_NAME = "lastName";
	public static final String IMAGE_URL = "imageUrl";
	public static final String USER_ID = "userId";
	public static final String USER_KEY = "userKey";

}

