package com.nebo.template.infrastructures.domain.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(PaperType.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class PaperType_ {

	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.PaperType#name
	 **/
	public static volatile SingularAttribute<PaperType, String> name;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.PaperType#width
	 **/
	public static volatile SingularAttribute<PaperType, Long> width;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.PaperType#description
	 **/
	public static volatile SingularAttribute<PaperType, String> description;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.PaperType#id
	 **/
	public static volatile SingularAttribute<PaperType, Integer> id;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.PaperType
	 **/
	public static volatile EntityType<PaperType> class_;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.PaperType#unitOfWidth
	 **/
	public static volatile SingularAttribute<PaperType, String> unitOfWidth;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.PaperType#height
	 **/
	public static volatile SingularAttribute<PaperType, Long> height;
	
	/**
	 * @see com.nebo.template.infrastructures.domain.model.PaperType#unitOfHeight
	 **/
	public static volatile SingularAttribute<PaperType, String> unitOfHeight;

	public static final String NAME = "name";
	public static final String WIDTH = "width";
	public static final String DESCRIPTION = "description";
	public static final String ID = "id";
	public static final String UNIT_OF_WIDTH = "unitOfWidth";
	public static final String HEIGHT = "height";
	public static final String UNIT_OF_HEIGHT = "unitOfHeight";

}

