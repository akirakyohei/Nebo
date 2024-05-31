package com.nebo.utils;

import org.apache.commons.lang3.StringUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class IOUtils {

    private static final Pattern BASE64_IMAGE_PATTERN = Pattern.compile("^data:([a-zA-Z0-9]+/[a-zA-Z0-9]+).*,(.*)");

    public static String extractMimeType(final String base64String) {
        final Matcher matcher = BASE64_IMAGE_PATTERN.matcher(base64String);
        if (!matcher.find())
            return "";
        return matcher.group(1).toLowerCase();
    }

    public static String getExtension(String mimeType) {

        switch (mimeType.toLowerCase()) {
            case "text/x-bwt":
                return "bwt";
            case "text/html":
                return "html";
            case "text/css":
                return "css";
            case "application/javascript":
                return "js";
            case "application/json":
                return "json";
            case "image/gif":
                return "gif";
            case "image/jpeg":
            case "image/jpg":
            case "image/pjpeg":
                return "jpg";
            case "image/png":
                return "png";
            case "image/x-icon":
                return "ico";
            case "image/svg+xml":
                return "svg";
            case "application/vnd.ms-fontobject":
                return "eot";
            case "application/x-font-truetype":
                return "ttf";
            case "application/font-woff":
                return "woff";
            case "application/x-shockwave-flash":
                return "swf";
            case "application/zip":
                return "zip";
            case "application/xlsx":
                return "xlsx";
            default:
                return StringUtils.EMPTY;
        }
    }
}
