package com.nebo.lib.feignclient.client;

import java.util.HashMap;
import java.util.Map;

public class B {


    public static Map<String, Object> withUserId(long userId) {
        Map<String, Object> headers = new HashMap<>();
        headers.put("X-Author-Id", userId);
        return headers;
    }

    public static Map<String, Object> withAppId(long userId, long appId) {
        Map<String, Object> headers = new HashMap<>();
        headers.put("X-Author-Id", userId);
        headers.put("X-App-Id", appId);
        return headers;
    }


}
