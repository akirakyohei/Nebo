package com.nebo.mediafile.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
@JsonRootName("file")
public class FileDataUploadResponse {
    private long id;
    private String name;
    private String key;
    private String extension;
    private long size;
    private Instant createdAt;
    private Instant updatedAt;
}
