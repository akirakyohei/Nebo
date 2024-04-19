package com.nebo.types;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonIgnoreProperties
public class DebeziumMessage<D> {
    private Object schema;
    private D payload;
}
