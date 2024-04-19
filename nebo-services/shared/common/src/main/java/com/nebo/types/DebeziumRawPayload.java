package com.nebo.types;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties
public class DebeziumRawPayload<D> {
    private D before;
    private D after;
    private DebeziumOperation op;
}
