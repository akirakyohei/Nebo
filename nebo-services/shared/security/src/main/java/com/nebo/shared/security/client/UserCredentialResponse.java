package com.nebo.shared.security.client;

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
