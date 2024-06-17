package com.nebo.sso.applications.model;


import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.shared.common.types.PageResponse;
import org.springframework.data.domain.Page;

@JsonRootName("users")
public class UsersResponse extends PageResponse<UserResponse> {
    public UsersResponse(Page<UserResponse> page) {
        super(page);
    }
}
