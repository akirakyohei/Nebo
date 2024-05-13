package com.nebo.sso.infrastructures.domain.converter;

import jakarta.persistence.AttributeConverter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;

import java.util.Arrays;
import java.util.List;

public class ListStringConverter implements AttributeConverter<List<String>, String> {
    @Override
    public String convertToDatabaseColumn(List<String> attribute) {
        return !CollectionUtils.isEmpty(attribute) ? StringUtils.join(",") : null;
    }

    @Override
    public List<String> convertToEntityAttribute(String dbData) {
        return dbData != null ? Arrays.stream(StringUtils.split(dbData, ",")).toList() : List.of();
    }
}
