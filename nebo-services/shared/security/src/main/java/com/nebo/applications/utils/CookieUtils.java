package com.nebo.applications.utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

public class CookieUtils {

    public static String getCookieByName(HttpServletRequest httpServletRequest, String name) {
        return httpServletRequest.getCookies() != null ? Arrays.stream(httpServletRequest.getCookies())
                .filter(cookie -> StringUtils.equals(cookie.getName(), name))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null) : null;
    }
}
