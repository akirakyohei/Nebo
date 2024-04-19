package com.nebo.sso.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.sso.infrastructures.domain.model.User;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
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
    private String imageUrl;
    private String email;
    private String phoneNumber;
    private List<String> permissions;
    private User.AuthProvider provider;
    private String providerId;
}
