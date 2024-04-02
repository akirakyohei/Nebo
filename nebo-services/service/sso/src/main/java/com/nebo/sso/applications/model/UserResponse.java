package com.nebo.sso.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonRootName("user")
public class UserResponse {
    private long id;
    private String firstName;
    private String lastName;
    private String imageUrl;
    private String email;
    private String phoneNumber;
}
