package com.nebo.mediafile.applications.services;

import com.nebo.mediafile.applications.model.FileDataUploadRequest;
import com.nebo.mediafile.applications.model.FileDataUploadResponse;
import com.nebo.web.applications.exception.ConstraintViolationException;
import org.apache.commons.lang3.tuple.Pair;

import java.io.InputStream;

public interface MediaService {
    FileDataUploadResponse saveFile(long userId, FileDataUploadRequest request) throws ConstraintViolationException;

    Pair<InputStream, String> getFile(String key);

    FileDataUploadResponse getFileMetadata(long userId, Long fileId);


    void deleteFileData(long userId, Long fileId);
}
