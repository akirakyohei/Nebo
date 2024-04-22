package com.nebo.reports.insfrastructures.domain.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(DimPaperType.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class DimPaperType_ {

	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimPaperType#paperTypeId
	 **/
	public static volatile SingularAttribute<DimPaperType, Long> paperTypeId;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimPaperType#name
	 **/
	public static volatile SingularAttribute<DimPaperType, String> name;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimPaperType#width
	 **/
	public static volatile SingularAttribute<DimPaperType, Long> width;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimPaperType#description
	 **/
	public static volatile SingularAttribute<DimPaperType, String> description;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimPaperType
	 **/
	public static volatile EntityType<DimPaperType> class_;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimPaperType#paperTypeKey
	 **/
	public static volatile SingularAttribute<DimPaperType, Integer> paperTypeKey;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimPaperType#unitOfWidth
	 **/
	public static volatile SingularAttribute<DimPaperType, String> unitOfWidth;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimPaperType#unitOfHeight
	 **/
	public static volatile SingularAttribute<DimPaperType, String> unitOfHeight;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimPaperType#height
	 **/
	public static volatile SingularAttribute<DimPaperType, Long> height;

	public static final String PAPER_TYPE_ID = "paperTypeId";
	public static final String NAME = "name";
	public static final String WIDTH = "width";
	public static final String DESCRIPTION = "description";
	public static final String PAPER_TYPE_KEY = "paperTypeKey";
	public static final String UNIT_OF_WIDTH = "unitOfWidth";
	public static final String UNIT_OF_HEIGHT = "unitOfHeight";
	public static final String HEIGHT = "height";

}

