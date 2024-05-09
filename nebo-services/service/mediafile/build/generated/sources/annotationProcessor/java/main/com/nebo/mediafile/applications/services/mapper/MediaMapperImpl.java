package com.nebo.mediafile.applications.services.mapper;

import com.nebo.mediafile.applications.model.FileDataUploadResponse;
import com.nebo.mediafile.insfrastructures.domain.model.FileData;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-08T21:30:44+0700",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.6.jar, environment: Java 17.0.6 (Oracle Corporation)"
)
@Component
public class MediaMapperImpl implements MediaMapper {

    @Override
    public FileDataUploadResponse fromDomainToResponse(FileData fileData) {
        if ( fileData == null ) {
            return null;
        }

        FileDataUploadResponse fileDataUploadResponse = new FileDataUploadResponse();

        if ( fileData.getId() != null ) {
            fileDataUploadResponse.setId( fileData.getId() );
        }
        fileDataUploadResponse.setFileName( fileData.getFileName() );
        fileDataUploadResponse.setKey( fileData.getKey() );
        fileDataUploadResponse.setExtension( fileData.getExtension() );
        fileDataUploadResponse.setSize( fileData.getSize() );

        return fileDataUploadResponse;
    }
}
