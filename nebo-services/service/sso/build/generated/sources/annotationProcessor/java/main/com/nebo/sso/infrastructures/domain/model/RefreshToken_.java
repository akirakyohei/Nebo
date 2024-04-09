package com.nebo.sso.infrastructures.domain.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.Instant;

@StaticMetamodel(RefreshToken.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class RefreshToken_ {

	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.RefreshToken#expiredDate
	 **/
	public static volatile SingularAttribute<RefreshToken, Instant> expiredDate;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.RefreshToken#id
	 **/
	public static volatile SingularAttribute<RefreshToken, Long> id;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.RefreshToken
	 **/
	public static volatile EntityType<RefreshToken> class_;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.RefreshToken#user
	 **/
	public static volatile SingularAttribute<RefreshToken, User> user;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.RefreshToken#refreshToken
	 **/
	public static volatile SingularAttribute<RefreshToken, String> refreshToken;

	public static final String EXPIRED_DATE = "expiredDate";
	public static final String ID = "id";
	public static final String USER = "user";
	public static final String REFRESH_TOKEN = "refreshToken";

}

