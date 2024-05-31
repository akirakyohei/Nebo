package com.nebo.reports.applications.model;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
public class Session {
    private long id;
    private long userId;
    private String refreshToken;
    private String token;
    private Instant expiredDate;
    private Instant createdAt;
}
