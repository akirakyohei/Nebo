package com.nebo.applications.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Setter
@Getter
public class User {
    @Serial
    private static final long serialVersionUID = 14783475456456L;

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

    private Instant createdOn;

    private Instant updatedOn;

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
