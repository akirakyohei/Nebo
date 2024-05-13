package com.nebo.sso.infrastructures.domain.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.util.List;

@StaticMetamodel(App.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class App_ {

	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.App#appId
	 **/
	public static volatile SingularAttribute<App, String> appId;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.App#name
	 **/
	public static volatile SingularAttribute<App, String> name;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.App#appSecret
	 **/
	public static volatile SingularAttribute<App, String> appSecret;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.App#scopes
	 **/
	public static volatile SingularAttribute<App, List<String>> scopes;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.App
	 **/
	public static volatile EntityType<App> class_;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.App#status
	 **/
	public static volatile SingularAttribute<App, Boolean> status;

	public static final String APP_ID = "appId";
	public static final String NAME = "name";
	public static final String APP_SECRET = "appSecret";
	public static final String SCOPES = "scopes";
	public static final String STATUS = "status";

}

