package com.nebo.lib.feignclient.client.model;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

import java.time.Instant;

@Setter
@Getter
@Jacksonized
public class FileDataUploadResponse {

    private FileDataUpload file;

    @Setter
    @Getter
    public static class FileDataUpload {
        private long id;
        private String name;
        private String key;
        private String extension;
        private long size;
        private Instant createdAt;
        private Instant updatedAt;
    }
}
