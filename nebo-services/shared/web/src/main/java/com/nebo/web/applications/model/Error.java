package com.nebo.web.applications.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Setter
@Getter
@Builder
public class Error {

    public final static String INVALID = "invalid";
    public final static String NOT_FOUND = "not_found";
    public final static String UNAUTHORIZED = "unauthorized";
    public final static String FORBIDDEN = "forbidden";

    private Map<String, String> error;
    private List<ErrorMessage> errors;

    @Setter
    @Getter
    @Builder
    public static class ErrorMessage {
        private String message;
        private List<String> fields;
        private String code;
    }
}
