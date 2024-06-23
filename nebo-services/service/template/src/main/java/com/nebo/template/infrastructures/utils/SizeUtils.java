package com.nebo.template.infrastructures.utils;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;

import java.util.List;
import java.util.Objects;
import java.util.regex.Pattern;

public class SizeUtils {

    private static Pattern pattern = Pattern.compile("/^([-.\\d]+(?:\\.\\d+)?)(.*)$/gm");

    public static Pair<Float, String> splitSize(String sizeStr) throws IllegalAccessException {
        final List<String> units = List.of("px", "mm", "cm", "in");
        return units.stream().map(unit -> {
            var numberStr = StringUtils.replaceOnce(sizeStr, unit, "");
            try {
                var number = Float.parseFloat(numberStr);
                return Pair.of(number,unit);
            } catch (NumberFormatException ex) {
            }
            return null;
        }).filter(Objects::nonNull).findFirst().orElseThrow(IllegalArgumentException::new);
    }

    public static float convertSize(float size, String unitOfSize) {
        switch (unitOfSize) {
            case "cm":
                return size * 10;
            case "in":
                return size * 25.4f;
            case "px":
                return size * 25.4f / 96;
            default:
                return size;
        }
    }
}
