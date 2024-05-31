package com.nebo.mediafile.applications.services;

import com.nebo.mediafile.applications.model.*;
import com.nebo.web.applications.exception.ConstraintViolationException;
import jakarta.servlet.http.HttpServletResponse;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface MediaService {
    FileDataUploadResponse uploadFile(long userId, FileDataUploadRequest request) throws ConstraintViolationException, UnsupportedEncodingException;

    FileDataUploadResponse updateFile(long userId, long id, FileDataUploadRequest request) throws ConstraintViolationException, UnsupportedEncodingException;

    void getFile(String key, HttpServletResponse response);

    FileDataUploadResponse getFileMetadata(long userId, Long fileId);

    FileDataUploadListResponse getFilMetadataByIds(long userId, List<Long> fileIds);

    FileDataUploadsResponse getFileMetadatas(long userId, FileDataFilterRequest request);


    void deleteFileData(long userId, Long fileId);
}
