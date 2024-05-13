package com.nebo.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.nebo.types.DebeziumMessage;
import com.nebo.types.DebeziumRawPayload;

public class KafkaConnectUtils {
    public static <T> T marshall(String value) {
        DebeziumMessage<T> message = JsonUtils.marshall(value, new TypeReference<DebeziumMessage<T>>() {
        });
        return message.getPayload();
    }

    public static <T> DebeziumRawPayload<T> marshallRaw(String value) {
        DebeziumMessage<DebeziumRawPayload<T>> message = JsonUtils.marshall(value, new TypeReference<DebeziumMessage<DebeziumRawPayload<T>>>() {
        });
        return message.getPayload();
    }
}
