package com.nebo.sso.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.annotations.PhoneNumber;
import com.nebo.sso.infrastructures.annotations.Password;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

@Setter
@Getter
@Validated
@JsonRootName("user")
public class UserChangePasswordRequest {
    @NotBlank
    @Password
    private String password;

    @NotBlank
    private String confirmPassword;

}
