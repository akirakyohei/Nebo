package com.nebo.reports.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
@Table(name = "fact_sessions")
@Entity
public class FactSession {
    @Id
    private long id;
    private long userKey;
    private String ipAddress;
    private String userAgent;
    private Instant createdAt;
}
