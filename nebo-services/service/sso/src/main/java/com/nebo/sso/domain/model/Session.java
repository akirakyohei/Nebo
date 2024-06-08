package com.nebo.sso.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Setter
@Getter
@Entity
@Table(name = "sessions")
@NoArgsConstructor
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String ipAddress;

    private String userAgent;

    @Column(nullable = false, unique = true)
    private String refreshToken;

    private String token;

    @Column(nullable = false)
    private Instant expiredDate;

    @CreationTimestamp
    private Instant createdAt;

    public Session(User user, String refreshToken,String token, String ipAddress, String userAgent, Instant expiredDate) {
        this.user = user;
        this.token= token;
        this.refreshToken = refreshToken;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.expiredDate = expiredDate;
    }
}
