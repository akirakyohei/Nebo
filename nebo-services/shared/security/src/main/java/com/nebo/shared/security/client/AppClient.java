package com.nebo.shared.security.client;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AppClient {
    private long id;
    private String name;
    private long userId;
    private String accessToken;
}
