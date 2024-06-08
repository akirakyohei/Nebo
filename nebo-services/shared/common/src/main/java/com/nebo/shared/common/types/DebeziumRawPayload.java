package com.nebo.shared.common.types;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;


@Data
@JsonIgnoreProperties
public class DebeziumRawPayload<D> {
    private D before;
    private D after;
    private DebeziumOperation op;
}
