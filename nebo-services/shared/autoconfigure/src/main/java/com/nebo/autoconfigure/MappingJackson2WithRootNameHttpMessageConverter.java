package com.nebo.autoconfigure;

import com.fasterxml.jackson.annotation.JsonRootName;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import java.lang.reflect.Type;
import java.util.Arrays;

public class MappingJackson2WithRootNameHttpMessageConverter extends MappingJackson2HttpMessageConverter {

    @Override
    public boolean canRead(Class<?> clazz, MediaType mediaType) {
        if (!hasAnnotation(clazz))
            return false;
        return super.canRead(clazz, mediaType);
    }

    @Override
    public boolean canRead(Type type, Class<?> contextClass, MediaType mediaType) {
        if (!hasAnnotation((Class<?>) type))
            return false;
        return super.canRead(type, contextClass, mediaType);
    }

    @Override
    public boolean canWrite(Class<?> clazz, MediaType mediaType) {
        if (!hasAnnotation(clazz))
            return false;
        return super.canWrite(clazz, mediaType);
    }

    private boolean hasAnnotation(Class<?> clazz) {
        return AnnotationUtils.getAnnotation(clazz, JsonRootName.class) != null;
    }
}
