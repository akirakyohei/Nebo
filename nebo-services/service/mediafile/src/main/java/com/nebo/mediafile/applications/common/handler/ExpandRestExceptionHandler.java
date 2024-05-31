package com.nebo.mediafile.applications.common.handler;

import com.nebo.mediafile.applications.common.exception.FileNotFoundException;
import com.nebo.mediafile.applications.common.exception.IOAccessException;
import com.nebo.mediafile.applications.common.exception.MinioException;
import com.nebo.web.applications.exception.NotFoundException;
import com.nebo.web.applications.model.Error;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class ExpandRestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(FileNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Error handleFileNotFoundException(FileNotFoundException exception) {
        return Error.builder()
                .error(Map.of(Error.NOT_FOUND, StringUtils.defaultIfBlank(exception.getMessage(), "Not found")))
                .build();
    }

    @ExceptionHandler(IOAccessException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public Error handleIOAccessException(IOAccessException exception) {
        return Error.builder()
                .error(Map.of(Error.INVALID, StringUtils.defaultIfBlank(exception.getMessage(), "IO access exception")))
                .build();
    }

    @ExceptionHandler(MinioException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public Error handleMinioException(MinioException exception) {
        return Error.builder()
                .error(Map.of(Error.INVALID, StringUtils.defaultIfBlank(exception.getMessage(), "Minio exception")))
                .build();
    }
}
