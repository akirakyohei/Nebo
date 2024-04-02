package com.nebo.sso.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.types.PageResponse;

@JsonRootName("users")
public class UsersResponse extends PageResponse<UserResponse> {
}
