package com.nebo.template.infrastructures.domain.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@StaticMetamodel(Template.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class Template_ {

	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Template#categoryIds
	 **/
	public static volatile SingularAttribute<Template, List<Integer>> categoryIds;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Template#data
	 **/
	public static volatile SingularAttribute<Template, Map<String,Object>> data;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Template#size
	 **/
	public static volatile SingularAttribute<Template, Long> size;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Template#paperTypeId
	 **/
	public static volatile SingularAttribute<Template, Integer> paperTypeId;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Template#name
	 **/
	public static volatile SingularAttribute<Template, String> name;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Template#id
	 **/
	public static volatile SingularAttribute<Template, Long> id;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Template#updatedOn
	 **/
	public static volatile SingularAttribute<Template, Timestamp> updatedOn;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Template#params
	 **/
	public static volatile SingularAttribute<Template, Map<String,Object>> params;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Template
	 **/
	public static volatile EntityType<Template> class_;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Template#userId
	 **/
	public static volatile SingularAttribute<Template, Long> userId;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.Template#createdOn
	 **/
	public static volatile SingularAttribute<Template, Timestamp> createdOn;

	public static final String CATEGORY_IDS = "categoryIds";
	public static final String DATA = "data";
	public static final String SIZE = "size";
	public static final String PAPER_TYPE_ID = "paperTypeId";
	public static final String NAME = "name";
	public static final String ID = "id";
	public static final String UPDATED_ON = "updatedOn";
	public static final String PARAMS = "params";
	public static final String USER_ID = "userId";
	public static final String CREATED_ON = "createdOn";

}

