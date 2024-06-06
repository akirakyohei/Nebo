package com.nebo.lib.feignclient.client.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Metadata {
    private int page;
    private int limit;
    private long totalElement;
}
