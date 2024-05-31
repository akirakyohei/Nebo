package com.nebo.sso.infrastructures.domain.model;

import com.nebo.sso.infrastructures.domain.converter.ListStringConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "app_clients")
@NoArgsConstructor
@AllArgsConstructor
public class AppClient implements Serializable {

    private final static int PREFIX_LENGTH = 6;
    @Serial
    private static final long serialVersionUID = 1584757465473L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long userId;

    private String name;
    private String prefix;
    private String accessToken;

    @Convert(converter = ListStringConverter.class)
    private List<String> scopes;

    @Column(updatable = false)
    private boolean status;


    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;


    public AppClient(long userId, String name, String accessToken) {
        this.userId = userId;
        this.name = name;
        this.accessToken = accessToken;
        this.prefix = accessToken.substring(0,PREFIX_LENGTH);
        this.status = true;
        this.scopes = new ArrayList<>();
    }
}