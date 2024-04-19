package com.nebo.mediafile.applications.services;

import com.nebo.applications.constant.TokenType;
import com.nebo.applications.utils.NeboSecurityUtils;
import com.nebo.mediafile.applications.common.exception.FileNotFoundException;
import com.nebo.mediafile.applications.model.FileDataUploadRequest;
import com.nebo.mediafile.applications.model.FileDataUploadResponse;
import com.nebo.mediafile.applications.model.FileModel;
import com.nebo.mediafile.applications.services.mapper.MediaMapper;
import com.nebo.mediafile.insfrastructures.domain.model.FileData;
import com.nebo.mediafile.insfrastructures.domain.repository.JpaFileDataRepository;
import com.nebo.mediafile.insfrastructures.utils.IOUtils;
import com.nebo.utils.MediaUtils;
import com.nebo.web.applications.exception.ConstraintViolationException;
import io.minio.errors.MinioException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class MediaServiceImpl implements MediaService {

    private final JpaFileDataRepository fileDataRepository;
    private final FileStorageService storageService;
    private final MediaMapper mediaMapper;
    @Value("${nebo.mediafile.default-folder-name}")
    private final String defaultFolderName;

    @Override
    public FileDataUploadResponse saveFile(long userId, FileDataUploadRequest request) throws ConstraintViolationException {
        if (!TokenType.basic_auth.equals(NeboSecurityUtils.getTokenType())) {
            request.setKey(MediaUtils.buildMediaKey(userId, request.getName(), request.getContentType(), defaultFolderName));
        }
        if (fileDataRepository.existsByUserIdAndKey(userId, request.getKey()))
            throw new ConstraintViolationException("key", "Key is exists");
        var fileData = FileData.builder()
                .fileName(request.getName())
                .key(request.getKey())
                .extension(IOUtils.getExtension(request.getContentType()))
                .size(request.getData().length)
                .build();
        fileData = fileDataRepository.save(fileData);
        try (var inputStream = new ByteArrayInputStream(request.getData())) {
            storageService.saveFile(FileModel.builder().inputStream(inputStream)
                    .name(request.getKey())
                    .size(fileData.getSize()).build());
        } catch (IOException | MinioException e) {
            e.printStackTrace();
        }
        return mediaMapper.fromDomainToResponse(fileData);
    }

    @Override
    public Pair<InputStream, String> getFile(String key) {
        return storageService.getFileByName(key);
    }

    @Override
    public FileDataUploadResponse getFileMetadata(long userId, Long fileId) {
        var fileData = fileDataRepository.findFileDataByUserIdAndId(userId, fileId)
                .orElseThrow(() -> new FileNotFoundException("File not found"));
        return mediaMapper.fromDomainToResponse(fileData);
    }

    @Override
    public void deleteFileData(long userId, Long fileId) {
        var fileData = fileDataRepository.findFileDataByUserIdAndId(userId, fileId)
                .orElseThrow(() -> new FileNotFoundException("File not found"));
        storageService.deleteFileByName(fileData.getKey());
        fileDataRepository.delete(fileData);
    }
}
