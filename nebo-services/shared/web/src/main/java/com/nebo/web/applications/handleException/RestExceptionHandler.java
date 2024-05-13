package com.nebo.web.applications.handleException;

import com.nebo.web.applications.exception.AuthenticationException;
import com.nebo.web.applications.exception.ExpiredTokenRefreshException;
import com.nebo.web.applications.exception.NotFoundException;
import com.nebo.web.applications.model.Error;
import jakarta.annotation.PostConstruct;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.ApplicationContextException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Error handleNotFoundException(NotFoundException exception) {
        return Error.builder()
                .error(Map.of(Error.NOT_FOUND, StringUtils.defaultIfBlank(exception.getMessage(), "Not found")))
                .build();
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
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
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Error handleCustomConstraintViolationException(com.nebo.web.applications.exception.ConstraintViolationException exception) {
        if (exception.getMessage() != null && StringUtils.isNotBlank(exception.getMessage()))
            return Error.builder()
                    .error(Map.of(Error.INVALID, exception.getMessage()))
                    .build();
        return exception.getError();
    }

    @ExceptionHandler(ApplicationContextException.class)
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
