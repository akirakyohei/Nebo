package com.nebo.persistences;


import jakarta.persistence.AttributeConverter;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ListIntegerConverter implements AttributeConverter<List<Integer>, String> {


    @Override
    public String convertToDatabaseColumn(List<Integer> attribute) {
        return StringUtils.join(attribute.stream().map(String::valueOf).toList(), ",");
    }

    @Override
    public List<Integer> convertToEntityAttribute(String dbData) {
        if (dbData == null)
            return null;
        return new ArrayList<Integer>(Arrays.stream(StringUtils.split(dbData, ","))
                .mapToInt(Integer::parseInt)
                .boxed().toList());
    }
}
