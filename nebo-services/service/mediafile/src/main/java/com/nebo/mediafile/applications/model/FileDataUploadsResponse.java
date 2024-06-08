package com.nebo.mediafile.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.shared.common.types.PageResponse;
import org.springframework.data.domain.Page;

@JsonRootName("files")
public class FileDataUploadsResponse extends PageResponse<FileDataUploadResponse> {
    public FileDataUploadsResponse(Page<FileDataUploadResponse> page) {
        super(page);
    }
}
