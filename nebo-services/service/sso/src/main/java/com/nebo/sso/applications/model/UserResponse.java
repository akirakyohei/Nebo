package com.nebo.sso.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.sso.domain.model.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@JsonRootName("user")
public class UserResponse {
    private long id;
    private String firstName;
    private String lastName;
    private String avatarUrl;
    private String email;
    private String phoneNumber;
    private List<String> permissions;
    private User.AuthProvider provider;
    private String providerId;
}
