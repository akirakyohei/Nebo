package com.nebo.mediafile.applications.services;

import com.nebo.mediafile.applications.model.FileModel;
import io.minio.errors.MinioException;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;

import java.io.InputStream;

public interface FileStorageService {
    void saveFile(FileModel fileModel) throws MinioException;

    void getFileByName(String key, HttpServletResponse response);

    void deleteFileByName( String key);
}
