package com.nebo.shared.common.persistences;


import jakarta.persistence.AttributeConverter;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ListLongConverter implements AttributeConverter<List<Long>, String> {


    @Override
    public String convertToDatabaseColumn(List<Long> attribute) {
        if (attribute == null)
            return null;
        return StringUtils.join(attribute.stream().map(String::valueOf).toList(), ",");
    }

    @Override
    public List<Long> convertToEntityAttribute(String dbData) {
        if (dbData == null)
            return null;
        return new ArrayList<Long>(Arrays.stream(StringUtils.split(dbData, ","))
                .mapToLong(Long::parseLong)
                .boxed().toList());
    }
}
