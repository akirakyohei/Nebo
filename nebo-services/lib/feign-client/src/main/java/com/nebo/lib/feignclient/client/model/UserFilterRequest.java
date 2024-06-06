package com.nebo.lib.feignclient.client.model;

import lombok.*;
import lombok.extern.jackson.Jacksonized;

import java.util.List;

@Setter
@Getter
@Builder
@Jacksonized
@NoArgsConstructor
@AllArgsConstructor
public class UserFilterRequest {
    private String query;
    private List<Long> ids;
    private int page;
    private int limit;
}
