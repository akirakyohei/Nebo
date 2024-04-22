package com.nebo.reports.insfrastructures.domain.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.Instant;

@StaticMetamodel(FactSession.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class FactSession_ {

	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactSession#ipAddress
	 **/
	public static volatile SingularAttribute<FactSession, String> ipAddress;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactSession#userAgent
	 **/
	public static volatile SingularAttribute<FactSession, String> userAgent;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactSession#id
	 **/
	public static volatile SingularAttribute<FactSession, Long> id;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactSession
	 **/
	public static volatile EntityType<FactSession> class_;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactSession#createdOn
	 **/
	public static volatile SingularAttribute<FactSession, Instant> createdOn;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.FactSession#userKey
	 **/
	public static volatile SingularAttribute<FactSession, Long> userKey;

	public static final String IP_ADDRESS = "ipAddress";
	public static final String USER_AGENT = "userAgent";
	public static final String ID = "id";
	public static final String CREATED_ON = "createdOn";
	public static final String USER_KEY = "userKey";

}

