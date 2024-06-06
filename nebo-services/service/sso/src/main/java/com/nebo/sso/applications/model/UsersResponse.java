package com.nebo.sso.applications.model;


import com.nebo.types.PageResponse;
import org.springframework.data.domain.Page;

public class UsersResponse extends PageResponse<UserResponse> {
    public UsersResponse(Page<UserResponse> page) {
        super(page);
    }
}
