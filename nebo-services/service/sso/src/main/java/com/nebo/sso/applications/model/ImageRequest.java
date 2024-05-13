package com.nebo.sso.applications.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ImageRequest {
    private byte[] data;
    private String name;
    private String contentType;
}
