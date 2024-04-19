package com.nebo.applications.model;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Setter
@Getter
public class AppClient {
    private long id;
    private String alias;
    private long userId;
    private String apiKey;
    private String apiSecret;
    private List<String> scopes;
    private Instant createdOn;
    private Instant updatedOn;
}
