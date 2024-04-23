package com.nebo.reports.applications.model;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileData {
    private Long id;
    private long userId;
    private String fileName;
    private String key;
    private String extension;
    private long size;
}