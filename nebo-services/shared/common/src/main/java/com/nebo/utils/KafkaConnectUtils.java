package com.nebo.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nebo.types.DebeziumMessage;
import com.nebo.types.DebeziumRawPayload;

import java.io.IOException;

public class KafkaConnectUtils {

    private static final ObjectMapper OBJECT_MAPPER = JsonUtils.createObjectMapper();

    public static <T> T marshall(String value, Class<T> tClass) throws IOException {
        var debeziumMessage = OBJECT_MAPPER.readValue(value, DebeziumMessage.class);
        return OBJECT_MAPPER.convertValue(debeziumMessage.getPayload(), tClass);
    }

    public static <T> DebeziumRawPayload<T> marshallRaw(String value, Class<T> tClass) throws IOException {
        var debeziumMessage = OBJECT_MAPPER.readValue(value, DebeziumMessage.class);
        var debeziumRawPayload = OBJECT_MAPPER.convertValue(debeziumMessage.getPayload(), DebeziumRawPayload.class);
        var newDebeziumRawPayload = new DebeziumRawPayload<T>();
        newDebeziumRawPayload.setOp(debeziumRawPayload.getOp());
        if (debeziumRawPayload.getBefore() != null) {
            newDebeziumRawPayload.setBefore(OBJECT_MAPPER.convertValue(debeziumRawPayload.getBefore(), tClass));
        }
        if (debeziumRawPayload.getAfter() != null) {
            newDebeziumRawPayload.setAfter(OBJECT_MAPPER.convertValue(debeziumRawPayload.getAfter(), tClass));
        }
        return newDebeziumRawPayload;
    }
}
