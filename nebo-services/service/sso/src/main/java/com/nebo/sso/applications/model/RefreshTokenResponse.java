package com.nebo.sso.applications.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RefreshTokenResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
}
