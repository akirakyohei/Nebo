package com.nebo.web.applications.handleException;

import com.nebo.web.applications.exception.AuthenticationException;
import com.nebo.web.applications.exception.ExpiredTokenRefreshException;
import com.nebo.web.applications.exception.NotFoundException;
import com.nebo.web.applications.model.Error;

import jakarta.validation.ConstraintViolationException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.ApplicationContextException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.method.MethodValidationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {


    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException exception, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        List<Error.ErrorMessage> errors = exception.getBindingResult().getFieldErrors()
                .stream()
                .map(constraintViolation -> {
                    return Error.ErrorMessage.builder()
                            .code(constraintViolation.getCode())
                            .message(constraintViolation.getDefaultMessage())
                            .fields(List.of(constraintViolation.getField()))
                            .build();
                })
                .toList();

        return ResponseEntity.unprocessableEntity()
                .body(Error.builder()
                .errors(errors)
                .build());
    }

    @Override
    protected ResponseEntity<Object> handleHandlerMethodValidationException(HandlerMethodValidationException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return super.handleHandlerMethodValidationException(ex, headers, status, request);
    }

    @Override
    protected ResponseEntity<Object> handleMethodValidationException(MethodValidationException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        return super.handleMethodValidationException(ex, headers, status, request);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException exception, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return ResponseEntity.unprocessableEntity()
                .body(Error.builder()
                        .error(Map.of("readable",exception.getMessage()))
                        .build());
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Error handleAccessionDe(AccessDeniedException exception) {
        return Error.builder()
                .error(Map.of(Error.ACCESS_DENIED, StringUtils.defaultIfBlank(exception.getMessage(), "Access denied")))
                .build();
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Error handleNotFoundException(NotFoundException exception) {
        return Error.builder()
                .error(Map.of(Error.NOT_FOUND, StringUtils.defaultIfBlank(exception.getMessage(), "Not found")))
                .build();
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public Error handleConstraintViolationException(ConstraintViolationException exception) {
        List<Error.ErrorMessage> errors = exception.getConstraintViolations()
                .stream()
                .map(constraintViolation -> {
                    return Error.ErrorMessage.builder()
                            .code(constraintViolation.getRootBeanClass().getName())
                            .message(constraintViolation.getMessage())
                            .fields(List.of(constraintViolation.getPropertyPath().toString()))
                            .build();
                })
                .collect(Collectors.toList());
        return Error.builder()
                .errors(errors)
                .build();
    }

    @ExceptionHandler(com.nebo.web.applications.exception.ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ResponseBody
    public ResponseEntity<Error> handleCustomConstraintViolationException(com.nebo.web.applications.exception.ConstraintViolationException exception) {
        if (exception.getMessage() != null && StringUtils.isNotBlank(exception.getMessage()))
            return ResponseEntity.ofNullable(Error.builder()
                    .error(Map.of(Error.INVALID, exception.getMessage()))
                    .build());
        return ResponseEntity.unprocessableEntity().body(exception.getError());
    }

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Error handleAuthenticationException(AuthenticationException exception) {
        return Error.builder()
                .error(Map.of(Error.UNAUTHORIZED, StringUtils.defaultIfBlank(exception.getMessage(), "The access token expired")))
                .build();
    }

    @ExceptionHandler(ExpiredTokenRefreshException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Error handleExpiredTokenRefreshException(ExpiredTokenRefreshException exception) {
        return Error.builder()
                .error(Map.of(Error.FORBIDDEN, "Refresh token was expired. Please make a new signin request"))
                .build();
    }


}
