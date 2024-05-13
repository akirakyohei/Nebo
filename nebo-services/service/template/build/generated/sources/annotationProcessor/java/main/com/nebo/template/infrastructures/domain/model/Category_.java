package com.nebo.template.infrastructures.domain.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.Instant;

@StaticMetamodel(Category.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class Category_ {

	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Category#groupId
	 **/
	public static volatile SingularAttribute<Category, Integer> groupId;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Category#name
	 **/
	public static volatile SingularAttribute<Category, String> name;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Category#id
	 **/
	public static volatile SingularAttribute<Category, Integer> id;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Category#updatedOn
	 **/
	public static volatile SingularAttribute<Category, Instant> updatedOn;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Category
	 **/
	public static volatile EntityType<Category> class_;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Category#userId
	 **/
	public static volatile SingularAttribute<Category, Long> userId;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Category#createdOn
	 **/
	public static volatile SingularAttribute<Category, Instant> createdOn;

	public static final String GROUP_ID = "groupId";
	public static final String NAME = "name";
	public static final String ID = "id";
	public static final String UPDATED_ON = "updatedOn";
	public static final String USER_ID = "userId";
	public static final String CREATED_ON = "createdOn";

}

