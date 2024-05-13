package com.nebo.utils;

import java.util.ArrayList;
import java.util.List;

public class SplitterUtils {
    public static List<String> split(String s, int chunkSize) {
        List<String> chunks = new ArrayList<>();
        StringBuilder sb = new StringBuilder(s);

        while (!(sb.length() == 0)) {
            chunks.add(sb.substring(0, chunkSize));
            sb.delete(0, chunkSize);

        }
        return chunks;
    }
}
