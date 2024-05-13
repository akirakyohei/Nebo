package com.nebo.reports.insfrastructures.domain.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.Instant;

@StaticMetamodel(DimDatetime.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class DimDatetime_ {

	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimDatetime#date
	 **/
	public static volatile SingularAttribute<DimDatetime, Instant> date;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimDatetime#firstDayOfYear
	 **/
	public static volatile SingularAttribute<DimDatetime, Instant> firstDayOfYear;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimDatetime#dayOfYear
	 **/
	public static volatile SingularAttribute<DimDatetime, Integer> dayOfYear;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimDatetime#year
	 **/
	public static volatile SingularAttribute<DimDatetime, Integer> year;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimDatetime#firstDayOfMonth
	 **/
	public static volatile SingularAttribute<DimDatetime, Instant> firstDayOfMonth;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimDatetime#monthOfYear
	 **/
	public static volatile SingularAttribute<DimDatetime, Integer> monthOfYear;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimDatetime#dayOfWeek
	 **/
	public static volatile SingularAttribute<DimDatetime, String> dayOfWeek;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimDatetime#hour
	 **/
	public static volatile SingularAttribute<DimDatetime, Integer> hour;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimDatetime#dayOfMonth
	 **/
	public static volatile SingularAttribute<DimDatetime, Integer> dayOfMonth;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimDatetime#firstHourOfDay
	 **/
	public static volatile SingularAttribute<DimDatetime, Instant> firstHourOfDay;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimDatetime#firstDayOfWeek
	 **/
	public static volatile SingularAttribute<DimDatetime, Instant> firstDayOfWeek;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimDatetime#dateKey
	 **/
	public static volatile SingularAttribute<DimDatetime, Long> dateKey;
	
	/**
	 * @see com.nebo.reports.insfrastructures.domain.model.DimDatetime
	 **/
	public static volatile EntityType<DimDatetime> class_;

	public static final String DATE = "date";
	public static final String FIRST_DAY_OF_YEAR = "firstDayOfYear";
	public static final String DAY_OF_YEAR = "dayOfYear";
	public static final String YEAR = "year";
	public static final String FIRST_DAY_OF_MONTH = "firstDayOfMonth";
	public static final String MONTH_OF_YEAR = "monthOfYear";
	public static final String DAY_OF_WEEK = "dayOfWeek";
	public static final String HOUR = "hour";
	public static final String DAY_OF_MONTH = "dayOfMonth";
	public static final String FIRST_HOUR_OF_DAY = "firstHourOfDay";
	public static final String FIRST_DAY_OF_WEEK = "firstDayOfWeek";
	public static final String DATE_KEY = "dateKey";

}

