package com.nebo.sso.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.shared.common.annotations.PhoneNumber;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@JsonRootName("user")
@Setter
@Getter
public class UserLoginRequest {

    @Email
    private String email;

    @PhoneNumber
    private String phoneNumber;

    @NotBlank
    @Size(min = 6, max = 30)
    private String password;
}
