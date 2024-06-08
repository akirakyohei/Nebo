package com.nebo.lib.feignclient.client.model;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

import java.time.Instant;
import java.util.List;

@Setter
@Getter
@Jacksonized
public class ApiKeyDetailResponse {

    private ApiKeyDetail apiKey;

    @Setter
    @Getter
    public static class ApiKeyDetail {
        private long id;
        private long userId;
        private String name;
        private String prefix;
        private String accessToken;
        private List<String> scopes;
        private Instant createdAt;
        private Instant updatedAt;
    }
}
