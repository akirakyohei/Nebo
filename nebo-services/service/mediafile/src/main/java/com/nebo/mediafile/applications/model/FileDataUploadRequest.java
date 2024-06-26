package com.nebo.mediafile.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonRootName("file")
public class FileDataUploadRequest {
    @NotBlank
    @Size(max = 500)
    private String name;
    private String key;
    private String contentType;
    private byte[] data;
}
