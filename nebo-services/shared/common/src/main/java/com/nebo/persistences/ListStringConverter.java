package com.nebo.persistences;

import jakarta.persistence.AttributeConverter;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ListStringConverter implements AttributeConverter<List<String>, String> {


    @Override
    public String convertToDatabaseColumn(List<String> attribute) {
        return StringUtils.join(attribute.stream().map(String::valueOf).toList(), ",");
    }

    @Override
    public List<String> convertToEntityAttribute(String dbData) {
        if(dbData==null)
            return null;
        return new ArrayList<String>(Arrays.stream(StringUtils.split(dbData, ","))
                .toList());
    }
}