package com.nebo.sso.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nebo.shared.common.persistences.ListStringConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Setter
@Getter
@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {
    @Serial
    private static final long serialVersionUID = 14783475456456L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    @Convert(converter = ListStringConverter.class)
    private List<String> permissions;

    private String password;

    @Column(updatable = false)
    private boolean status;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;

    private Long avatarId;
    private String avatarUrl;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    public enum AuthProvider {
        local,
        facebook,
        google,
    }

    @JsonIgnore
    public static String getFullName(String firstName, String lastName) {
        return Stream.of(firstName, lastName)
                .filter(Objects::nonNull).collect(Collectors.joining(" "));
    }
}
