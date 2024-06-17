package com.nebo.reports.infrastructures.utils;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

public class DateUtils {

    public static final ZoneId zoneIdVn = ZoneId.of("Asia/Ho_Chi_Minh");
    public static final ZoneOffset zoneOffsetVn = ZoneOffset.ofHours(7);
    private static final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static Instant parse(String dateStr) {
        LocalDateTime date = null;
        try {
            date = LocalDateTime.parse(dateStr, dtf);
        } catch (Exception ex) {
        }
        if (date != null)
            return date.toInstant(ZoneOffset.UTC);
        return null;
    }
}
