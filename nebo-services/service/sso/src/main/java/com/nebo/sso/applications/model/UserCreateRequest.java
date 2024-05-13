package com.nebo.sso.applications.model;


import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.sso.infrastructures.annotations.Password;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonRootName("user")
public class UserCreateRequest {
    @NotBlank
    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

    @Email
    private String email;

    @Password
    private String password;

    private String phoneNumber;

}
