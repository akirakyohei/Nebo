package com.nebo.mediafile.insfrastructures.domain.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(FileData.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class FileData_ {

	
	/**
	 * @see com.nebo.mediafile.insfrastructures.domain.model.FileData#fileName
	 **/
	public static volatile SingularAttribute<FileData, String> fileName;
	
	/**
	 * @see com.nebo.mediafile.insfrastructures.domain.model.FileData#extension
	 **/
	public static volatile SingularAttribute<FileData, String> extension;
	
	/**
	 * @see com.nebo.mediafile.insfrastructures.domain.model.FileData#size
	 **/
	public static volatile SingularAttribute<FileData, Long> size;
	
	/**
	 * @see com.nebo.mediafile.insfrastructures.domain.model.FileData#id
	 **/
	public static volatile SingularAttribute<FileData, Long> id;
	
	/**
	 * @see com.nebo.mediafile.insfrastructures.domain.model.FileData
	 **/
	public static volatile EntityType<FileData> class_;
	
	/**
	 * @see com.nebo.mediafile.insfrastructures.domain.model.FileData#userId
	 **/
	public static volatile SingularAttribute<FileData, Long> userId;
	
	/**
	 * @see com.nebo.mediafile.insfrastructures.domain.model.FileData#key
	 **/
	public static volatile SingularAttribute<FileData, String> key;

	public static final String FILE_NAME = "fileName";
	public static final String EXTENSION = "extension";
	public static final String SIZE = "size";
	public static final String ID = "id";
	public static final String USER_ID = "userId";
	public static final String KEY = "key";

}

