package com.nebo.mediafile.applications.services.mapper;

import com.nebo.mediafile.applications.model.FileDataUploadResponse;
import com.nebo.mediafile.domain.model.FileData;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MediaMapper {
    @Mapping(source = "fileName",target = "name")
    FileDataUploadResponse fromDomainToResponse(FileData fileData);
}
