package com.nebo.sso.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.annotations.PhoneNumber;
import com.nebo.sso.infrastructures.annotations.Password;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

@Setter
@Getter
@Validated
@JsonRootName("user")
public class UserUpdateRequest {
    @NotBlank
    @Size(max = 50)
    private Optional<@NotBlank @Size(max = 50) String> firstName;

    private Optional<@Size(max = 50) String> lastName;

    private Optional<@Email String> email;

    private Optional<@PhoneNumber String> phoneNumber;

    private String confirmPassword;

    private ImageRequest avatar;
}
