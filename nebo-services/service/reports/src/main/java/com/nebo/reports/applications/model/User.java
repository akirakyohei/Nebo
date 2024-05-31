package com.nebo.reports.applications.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Setter
@Getter
public class User {
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private List<String> permissions;

    private String password;

    private boolean status;

    private AuthProvider provider;

    private String providerId;

    private Instant createdAt;

    private Instant updatedAt;

    public enum AuthProvider {
        local,
        facebook,
        google,
    }

    @JsonIgnore
    public static String getFullName(String firstName, String lastName) {
        return List.of(firstName, lastName).stream()
                .filter(Objects::nonNull).collect(Collectors.joining(" "));
    }
}
