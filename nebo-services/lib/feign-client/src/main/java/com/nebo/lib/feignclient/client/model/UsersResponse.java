package com.nebo.lib.feignclient.client.model;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

@Setter
@Getter
@Jacksonized
public class UsersResponse {
    private PageResponse<User> users;
}
