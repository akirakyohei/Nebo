package com.nebo.sso.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonRootName("refresh_token")
public class TokenRefreshRequest {
    @NotBlank
    private String refreshToken;
    @NotBlank
    private String token;
}
