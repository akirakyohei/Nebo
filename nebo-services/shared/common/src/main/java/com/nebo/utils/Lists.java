package com.nebo.utils;

import java.util.List;
import java.util.stream.Stream;

public class Lists {
    public static <T> List<T> join(List<T> list1, List<T> list2) {
        return Stream.concat(list1.stream(), list2.stream()).toList();
    }
}
