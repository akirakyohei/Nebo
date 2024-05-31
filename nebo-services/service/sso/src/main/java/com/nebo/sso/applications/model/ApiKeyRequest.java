package com.nebo.sso.applications.model;


import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonRootName("api_key")
public class ApiKeyRequest {
    private String name;
    private Boolean status;
}
