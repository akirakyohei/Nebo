package com.nebo.mediafile.applications.services.mapper;

import com.nebo.mediafile.applications.model.FileDataUploadResponse;
import com.nebo.mediafile.insfrastructures.domain.model.FileData;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MediaMapper {
    FileDataUploadResponse fromDomainToResponse(FileData fileData);
}
