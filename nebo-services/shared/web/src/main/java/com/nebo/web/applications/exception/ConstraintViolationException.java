package com.nebo.web.applications.exception;

import com.nebo.web.applications.model.Error;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Setter
@Getter
public class ConstraintViolationException extends Exception {
    private Error error;


    public ConstraintViolationException(String field, String message) {
        this.error = Error.builder()
                .error(Map.of(field, message))
                .build();
    }
}
