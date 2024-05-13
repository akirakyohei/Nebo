package com.nebo.applications.config;

import feign.Response;
import feign.RetryableException;
import feign.codec.ErrorDecoder;

public class NeboErrorDecoder implements ErrorDecoder {

    private final ErrorDecoder defaultErrorDecoder = new Default();

    @Override
    public Exception decode(String methodKey, Response response) {
        if (response.status() == 401) {
            return new RetryableException(response.status(),response.reason(),response.request().httpMethod(), new Exception(),5L,response.request());
        }
        return defaultErrorDecoder.decode(methodKey, response);
    }
}
