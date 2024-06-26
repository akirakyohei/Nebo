package com.nebo.mediafile.interfaces.rest;

import com.google.common.io.ByteStreams;
import com.nebo.mediafile.applications.model.*;
import com.nebo.mediafile.applications.services.MediaService;
import com.nebo.shared.web.applications.bind.UserId;
import com.nebo.shared.web.applications.exception.ConstraintViolationException;
import com.nebo.shared.web.applications.exception.NotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {
    private final MediaService mediaService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public FileDataUploadResponse fileUpload(@UserId long userId, @RequestBody @Valid FileDataUploadRequest request) throws ConstraintViolationException, UnsupportedEncodingException {
        return mediaService.uploadFile(userId, request);
    }

    @PutMapping(value = "/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public FileDataUploadResponse updateFile(@UserId long userId, @PathVariable("id") long id, @RequestBody @Valid FileDataUploadRequest request) throws ConstraintViolationException, UnsupportedEncodingException {
        return mediaService.updateFile(userId, id, request);
    }

    @GetMapping(path = "/data/**")
    public void fileDownload(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var key = request.getRequestURI().replaceAll("/api/files/data/", "");
        var result = mediaService.getFile(key);
        if (result == null)
            throw new NotFoundException();

        response.addHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + result.getValue());
        response.setCharacterEncoding("UTF-8");
        ByteArrayResource resource = new ByteArrayResource(result.getKey());
        ByteStreams.copy(resource.getInputStream(), response.getOutputStream());
        response.flushBuffer();
    }

    @GetMapping(path = "/metadata/by_ids")
    public FileDataUploadListResponse getFileDatasByIds(@UserId long userId, @RequestParam("ids") List<Long> ids) {
        return mediaService.getFilMetadataByIds(userId, ids);
    }

    @GetMapping(path = "/metadata")
    public FileDataUploadsResponse getFileDatas(@UserId long userId, FileDataFilterRequest request) {
        return mediaService.getFileMetadatas(userId, request);
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
