package com.nebo.lib.feignclient.client.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Jacksonized
public class UsersResponse {

    @JsonProperty("users")
    private UserPageResponse users;


    @Setter
    @Getter
    public static class UserPageResponse extends PageResponse<User> {

        public UserPageResponse() {
        }
    }
}
