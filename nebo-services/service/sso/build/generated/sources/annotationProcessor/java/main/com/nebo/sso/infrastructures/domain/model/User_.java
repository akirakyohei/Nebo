package com.nebo.sso.infrastructures.domain.model;

import com.nebo.sso.infrastructures.domain.model.User.AuthProvider;
import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.Instant;
import java.util.List;

@StaticMetamodel(User.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class User_ {

	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.User#lastName
	 **/
	public static volatile SingularAttribute<User, String> lastName;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.User#firstName
	 **/
	public static volatile SingularAttribute<User, String> firstName;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.User#createdAt
	 **/
	public static volatile SingularAttribute<User, Instant> createdAt;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.User#password
	 **/
	public static volatile SingularAttribute<User, String> password;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.User#phoneNumber
	 **/
	public static volatile SingularAttribute<User, String> phoneNumber;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.User#avatarId
	 **/
	public static volatile SingularAttribute<User, Long> avatarId;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.User#provider
	 **/
	public static volatile SingularAttribute<User, AuthProvider> provider;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.User#permissions
	 **/
	public static volatile SingularAttribute<User, List<String>> permissions;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.User#providerId
	 **/
	public static volatile SingularAttribute<User, String> providerId;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.User#id
	 **/
	public static volatile SingularAttribute<User, Long> id;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.User
	 **/
	public static volatile EntityType<User> class_;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.User#email
	 **/
	public static volatile SingularAttribute<User, String> email;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.User#status
	 **/
	public static volatile SingularAttribute<User, Boolean> status;
	
	/**
	 * @see com.nebo.sso.infrastructures.domain.model.User#updatedAt
	 **/
	public static volatile SingularAttribute<User, Instant> updatedAt;

	public static final String LAST_NAME = "lastName";
	public static final String FIRST_NAME = "firstName";
	public static final String CREATED_AT = "createdAt";
	public static final String PASSWORD = "password";
	public static final String PHONE_NUMBER = "phoneNumber";
	public static final String AVATAR_ID = "avatarId";
	public static final String PROVIDER = "provider";
	public static final String PERMISSIONS = "permissions";
	public static final String PROVIDER_ID = "providerId";
	public static final String ID = "id";
	public static final String EMAIL = "email";
	public static final String STATUS = "status";
	public static final String UPDATED_AT = "updatedAt";

}

