package com.nebo.mediafile.applications.services;

import com.nebo.mediafile.applications.model.*;
import com.nebo.shared.web.applications.exception.ConstraintViolationException;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.tuple.Pair;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface MediaService {
    FileDataUploadResponse uploadFile(long userId, FileDataUploadRequest request) throws ConstraintViolationException, UnsupportedEncodingException;

    FileDataUploadResponse updateFile(long userId, long id, FileDataUploadRequest request) throws ConstraintViolationException, UnsupportedEncodingException;

    Pair<byte[],String> getFile(String key);

    FileDataUploadResponse getFileMetadata(long userId, Long fileId);

    FileDataUploadListResponse getFilMetadataByIds(long userId, List<Long> fileIds);

    FileDataUploadsResponse getFileMetadatas(long userId, FileDataFilterRequest request);


    void deleteFileData(long userId, Long fileId);
}
