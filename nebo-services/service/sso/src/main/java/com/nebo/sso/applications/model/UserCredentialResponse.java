package com.nebo.sso.applications.model;

import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCredentialResponse {
    private long userId;
    private String firstName;
    private String lastName;
    private List<String> permissions;
}
