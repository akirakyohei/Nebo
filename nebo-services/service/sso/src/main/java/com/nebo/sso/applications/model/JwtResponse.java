package com.nebo.sso.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Builder
@JsonRootName("user_token")
public class JwtResponse {
    private Long id;
    private List<String> permissions;
    private String token;
    private String type = "Bearer";
    private String refreshToken;
}
