package com.nebo.template.applications.model.template;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
public class ImageResponse {
    private String name;
    private String extension;
    private String url;
    private Instant createdAt;
    private Instant updatedAt;
}
