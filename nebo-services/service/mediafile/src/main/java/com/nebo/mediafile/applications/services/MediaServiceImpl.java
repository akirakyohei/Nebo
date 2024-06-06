package com.nebo.mediafile.applications.services;

import com.nebo.shared.security.constant.TokenType;
import com.nebo.shared.security.utils.NeboSecurityUtils;
import com.nebo.mediafile.applications.common.exception.FileNotFoundException;
import com.nebo.mediafile.applications.model.*;
import com.nebo.mediafile.applications.services.mapper.MediaMapper;
import com.nebo.mediafile.infrastructures.domain.model.FileData;
import com.nebo.mediafile.infrastructures.domain.model.FileData_;
import com.nebo.mediafile.infrastructures.domain.repository.JpaFileDataRepository;
import com.nebo.mediafile.infrastructures.domain.specification.FileDataSpecification;
import com.nebo.mediafile.infrastructures.utils.IOUtils;
import com.nebo.utils.MediaUtils;
import com.nebo.web.applications.exception.ConstraintViolationException;
import com.nebo.web.applications.exception.NotFoundException;
import io.minio.errors.MinioException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MediaServiceImpl implements MediaService {

    private final JpaFileDataRepository fileDataRepository;
    private final FileStorageService storageService;
    private final MediaMapper mediaMapper;
    @Value("${nebo.mediafile.default-folder-name}")
    private String defaultFolderName;

    @Override
    public FileDataUploadResponse uploadFile(long userId, FileDataUploadRequest request) throws ConstraintViolationException, UnsupportedEncodingException {
        if (!TokenType.basic_auth.equals(NeboSecurityUtils.getTokenType())) {
            request.setKey(MediaUtils.buildMediaKey(userId, request.getName(), defaultFolderName));
        }
        if (fileDataRepository.existsByUserIdAndKey(userId, request.getKey()))
            throw new ConstraintViolationException("key", "Key is exists");
        var fileData = FileData.builder()
                .userId(userId)
                .fileName(request.getName())
                .key(request.getKey())
                .extension(IOUtils.getExtension(request.getContentType()))
                .size(request.getData().length)
                .system(TokenType.basic_auth.equals(NeboSecurityUtils.getTokenType()))
                .build();
        fileData = fileDataRepository.save(fileData);
        try (var inputStream = new ByteArrayInputStream(request.getData())) {
            storageService.saveFile(FileModel.builder().inputStream(inputStream)
                    .name(request.getKey())
                    .extension(request.getContentType())
                    .size(fileData.getSize()).build());
        } catch (IOException | MinioException e) {
            e.printStackTrace();
        }
        return mediaMapper.fromDomainToResponse(fileData);
    }

    @Override
    public FileDataUploadResponse updateFile(long userId, long id, FileDataUploadRequest request) throws ConstraintViolationException, UnsupportedEncodingException {
        if (!TokenType.basic_auth.equals(NeboSecurityUtils.getTokenType())) {
            request.setKey(MediaUtils.buildMediaKey(userId, request.getName(), defaultFolderName));
        }
        var fileData = fileDataRepository.findFileDataByUserIdAndId(userId, id)
                .orElseThrow(NotFoundException::new);
        var fileDataByKey = fileDataRepository.findFileDataByUserIdAndKey(userId, request.getKey()).orElse(null);
        if (fileDataByKey != null && fileDataByKey.getId() != id)
            throw new ConstraintViolationException("key", "Key is exists");
        fileData.setFileName(request.getName());
        fileData.setKey(request.getKey());
        fileData.setExtension(IOUtils.getExtension(request.getContentType()));
        fileData.setSize(request.getData().length);
        fileData = fileDataRepository.save(fileData);
        try (var inputStream = new ByteArrayInputStream(request.getData())) {
            storageService.saveFile(FileModel.builder().inputStream(inputStream)
                    .name(request.getKey())
                    .extension(request.getContentType())
                    .size(fileData.getSize()).build());
        } catch (IOException | MinioException e) {
            e.printStackTrace();
        }
        return mediaMapper.fromDomainToResponse(fileData);
    }

    public void getFile(String key, HttpServletResponse response) {
        storageService.getFileByName(key, response);
    }

    @Override
    public FileDataUploadsResponse getFileMetadatas(long userId, FileDataFilterRequest request) {
        var spec = FileDataSpecification.toFilter(userId, request);
        var page = fileDataRepository.findAll(spec, request.toPageable(Sort.by(Sort.Direction.DESC, FileData_.CREATED_AT)));
        return new FileDataUploadsResponse(page.map(mediaMapper::fromDomainToResponse));
    }

    @Override
    public FileDataUploadResponse getFileMetadata(long userId, Long fileId) {
        var fileData = fileDataRepository.findFileDataByUserIdAndId(userId, fileId)
                .orElseThrow(() -> new FileNotFoundException("File not found"));
        return mediaMapper.fromDomainToResponse(fileData);
    }

    @Override
    public FileDataUploadListResponse getFilMetadataByIds(long userId, List<Long> fileIds) {
        var fileDatas = fileDataRepository.findFileDataByUserIdAndIdIn(userId, fileIds);
        return new FileDataUploadListResponse(fileDatas.stream().map(mediaMapper::fromDomainToResponse).toList());
    }

    @Override
    public void deleteFileData(long userId, Long fileId) {
        var fileData = fileDataRepository.findFileDataByUserIdAndId(userId, fileId)
                .orElseThrow(() -> new FileNotFoundException("File not found"));
        storageService.deleteFileByName(fileData.getKey());
        fileDataRepository.delete(fileData);
    }
}
