package com.nebo.sso.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.types.PageResponse;
import org.springframework.data.domain.Page;

@JsonRootName("api_keys")
public class ApiKeysResponse extends PageResponse<ApiKeyResponse> {
    public ApiKeysResponse(Page<ApiKeyResponse> page) {
        super(page);
    }
}
