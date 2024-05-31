package com.nebo.lib.feignclient.client.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FileDataUploadListResponse {
    private List<FileDataUploadResponse.FileDataUpload> files;
}
