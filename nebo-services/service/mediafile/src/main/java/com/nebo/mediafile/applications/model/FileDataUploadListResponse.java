package com.nebo.mediafile.applications.model;

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
    private List<FileDataUploadResponse> files;
}
