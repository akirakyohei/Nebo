package com.nebo.sso.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Setter
@Getter
@JsonRootName("api_key")
public class ApiKeyDetailResponse {
    private long id;
    private long userId;
    private String name;
    private String prefix;
    private String accessToken;

    private List<String> scopes;
    private Instant createdAt;
    private Instant updatedAt;
}
