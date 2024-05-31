package com.nebo.sso.infrastructures.domain.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.Instant;

@StaticMetamodel(Session.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class Session_ {

	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.Session#createdAt
	 **/
	public static volatile SingularAttribute<Session, Instant> createdAt;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.Session#expiredDate
	 **/
	public static volatile SingularAttribute<Session, Instant> expiredDate;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.Session#ipAddress
	 **/
	public static volatile SingularAttribute<Session, String> ipAddress;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.Session#userAgent
	 **/
	public static volatile SingularAttribute<Session, String> userAgent;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.Session#id
	 **/
	public static volatile SingularAttribute<Session, Long> id;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.Session
	 **/
	public static volatile EntityType<Session> class_;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.Session#user
	 **/
	public static volatile SingularAttribute<Session, User> user;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.Session#refreshToken
	 **/
	public static volatile SingularAttribute<Session, String> refreshToken;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.Session#token
	 **/
	public static volatile SingularAttribute<Session, String> token;

	public static final String CREATED_AT = "createdAt";
	public static final String EXPIRED_DATE = "expiredDate";
	public static final String IP_ADDRESS = "ipAddress";
	public static final String USER_AGENT = "userAgent";
	public static final String ID = "id";
	public static final String USER = "user";
	public static final String REFRESH_TOKEN = "refreshToken";
	public static final String TOKEN = "token";

}

