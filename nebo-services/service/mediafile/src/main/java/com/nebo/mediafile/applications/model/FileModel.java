package com.nebo.mediafile.applications.model;

import lombok.Builder;
import lombok.Data;

import java.io.InputStream;

@Data
@Builder
public class FileModel {
    private InputStream inputStream;
    private String name;
    private long size;
    private String extension;
}
