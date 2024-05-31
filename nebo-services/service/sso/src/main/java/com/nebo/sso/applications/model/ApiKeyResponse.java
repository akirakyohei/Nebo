package com.nebo.sso.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
@JsonRootName("api_key")
public class ApiKeyResponse {
private  long id;
private long userId;
private String name;
private String prefix;
private Instant createdAt;
private Instant updatedAt;
}
