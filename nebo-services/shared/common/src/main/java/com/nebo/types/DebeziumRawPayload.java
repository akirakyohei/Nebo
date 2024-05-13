package com.nebo.types;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.Getter;


@Data
@JsonIgnoreProperties
public class DebeziumRawPayload<D> {
    private D before;
    private D after;
    private DebeziumOperation op;
}
