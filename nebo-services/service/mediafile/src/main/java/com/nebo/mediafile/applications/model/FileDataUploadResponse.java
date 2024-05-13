package com.nebo.mediafile.applications.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FileDataUploadResponse {
    private long id;
    private String fileName;
    private String key;
    private String extension;
    private long size;
}
