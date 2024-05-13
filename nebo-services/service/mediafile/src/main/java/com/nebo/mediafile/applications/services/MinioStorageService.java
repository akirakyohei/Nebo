package com.nebo.mediafile.applications.services;

import com.nebo.mediafile.applications.common.exception.FileNotFoundException;
import com.nebo.mediafile.applications.event.FileSaveFailedEvent;
import com.nebo.mediafile.applications.model.FileModel;
import com.nebo.mediafile.insfrastructures.config.MinioConfigurerProperties;
import io.minio.*;
import io.minio.errors.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class MinioStorageService implements FileStorageService {
    private final MinioClient minioClient;
    private final ApplicationEventPublisher applicationEventPublisher;
    private final MinioConfigurerProperties minioConfigurerProperties;

    @PostConstruct
    private void createBucketIfNotExists() {
        try {
            var bucketName = minioConfigurerProperties.getBucket();
            if (!minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build())) {
                log.info("No bucket with a name = {}, trying to create it.", bucketName);

                minioClient.makeBucket(MakeBucketArgs.builder()
                        .bucket(bucketName)
                        .build());
                log.info("Bucket with name: {} was created.", bucketName);
            }
        } catch (ServerException | IOException | NoSuchAlgorithmException | InvalidKeyException | InvalidResponseException | XmlParserException | ErrorResponseException | InternalException | InsufficientDataException e) {
            log.info("Failed when create bucket.");
            throw new RuntimeException(e);
        }
    }


    @Async
    @Override
    public void saveFile(FileModel fileModel) throws MinioException {

        log.info("Saving a file to s3(minio): {}", fileModel);
        try {
            minioClient.putObject(PutObjectArgs.builder()
                    .bucket(minioConfigurerProperties.getBucket())
                    .object(fileModel.getName())
                    .headers(Map.of("name", fileModel.getName()))
                    .contentType(fileModel.getExtension())
                    .stream(fileModel.getInputStream(), fileModel.getSize(), -1)
                    .build());
            log.info("File has been saved in s3(minio)");
        } catch (Exception e) {
            log.error("Failed to save file in s3(minio)");
            applicationEventPublisher.publishEvent(new FileSaveFailedEvent(fileModel.getName()));
            throw new MinioException("Failed to save file in s3(minio)");
        }
    }

    @Override
    public Pair<InputStream, String> getFileByName(String key) {
        try (var result = minioClient.getObject(GetObjectArgs.builder()
                .bucket(minioConfigurerProperties.getBucket()).object(key).build())) {
            var name = result.headers().get("name");
            return Pair.of(result, name);
        } catch (Exception e) {
            throw new FileNotFoundException("File not found in storage.");
        }
    }

    @Async
    @Override
    public void deleteFileByName(String key) {
        log.info("Deleting from s3(minio) file with file name: {}", key);
        try {
            minioClient.removeObject(RemoveObjectArgs.builder()
                    .bucket(minioConfigurerProperties.getBucket())
                    .object(key)
                    .build());
            log.info("File was deleted from s3(minio). File name: {}", key);
        } catch (Exception ignore) {
            log.error("File with name {} not found", key);
        }

    }

}
