package com.nebo.sso.infrastructures.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nebo.sso.infrastructures.domain.converter.ListStringConverter;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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

    @CreationTimestamp
    private Instant createdOn;

    @UpdateTimestamp
    private Instant updatedOn;

    public static enum AuthProvider {
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
