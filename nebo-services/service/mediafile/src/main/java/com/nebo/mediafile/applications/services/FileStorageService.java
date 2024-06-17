package com.nebo.mediafile.applications.services;

import com.nebo.mediafile.applications.common.exception.FileNotFoundException;
import com.nebo.mediafile.applications.model.FileModel;
import io.minio.errors.MinioException;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.tuple.Pair;

public interface FileStorageService {
    void saveFile(FileModel fileModel) throws MinioException;

    Pair<byte[],String> getFileByName(String key) throws FileNotFoundException;

    void deleteFileByName( String key);
}
