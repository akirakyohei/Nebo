package com.nebo.lib.feignclient.client.model;


import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

@Setter
@Getter
@Builder
@Jacksonized
public class FileDataUploadRequest {

    private FileDataUpload file;

    @Setter
    @Getter
    @Builder
    public static class FileDataUpload {
        private String name;
        private String key;
        private String contentType;
        private byte[] data;
    }
}
