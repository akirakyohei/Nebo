package com.nebo.mediafile.interfaces.rest;

import com.google.common.io.ByteStreams;
import com.nebo.mediafile.applications.model.FileDataUploadRequest;
import com.nebo.mediafile.applications.model.FileDataUploadResponse;
import com.nebo.mediafile.applications.services.MediaService;
import com.nebo.web.applications.bind.UserId;
import com.nebo.web.applications.exception.ConstraintViolationException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {
    private final MediaService mediaService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public FileDataUploadResponse fileUpload(@UserId long userId, @RequestBody @Valid FileDataUploadRequest request) throws ConstraintViolationException {
        return mediaService.saveFile(userId, request);
    }

    @GetMapping(path = "/data/{key}")
    public void fileDownload(@PathVariable("key") String key, HttpServletResponse response) throws IOException {
        log.info("Request to receive a file with id: {}", key);

        var result = mediaService.getFile(key);
        String encodedOriginalName = URLEncoder.encode(result.getRight(), String.valueOf(StandardCharsets.UTF_8));
        response.addHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + encodedOriginalName);
        response.setCharacterEncoding("UTF-8");
        ByteStreams.copy(result.getLeft(), response.getOutputStream());
        response.flushBuffer();
        log.info("File was sent in response");
    }

    @GetMapping(path = "/metadata/{id}")
    public FileDataUploadResponse getFileData(@UserId long userId, @PathVariable("id") Long fileId) {
        log.info("Request to get a file data");
        return mediaService.getFileMetadata(userId, fileId);
    }

    @DeleteMapping(path = "/{id}")
    public void fileDelete(@UserId long userId, @PathVariable("id") Long fileId) {
        log.info("User with id = {}  wants to delete the file with id = {}", "userId", fileId);
        mediaService.deleteFileData(userId, fileId);
    }

}
