package com.nebo.sso.infrastructures.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

public class CookieUtils {
    public static String getCookie(HttpServletRequest request, String name) {
        var cookies = request.getCookies();
        if (cookies == null || StringUtils.isEmpty(name)) {
            return null;
        }
        return Arrays.stream(cookies).filter(cookie -> StringUtils.equals(cookie.getName(), name))
                .map(Cookie::getValue).findFirst().orElse(null);
    }

    public static void addCookie(String name, String value, String path, HttpServletRequest request, HttpServletResponse response) {
        var cookie = new Cookie(name, value);
        if (path != null)
            cookie.setPath(path);

        if ("https".equals(request.getScheme()))
            cookie.setSecure(true);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }

    public static void removeCookie(String name, String path, HttpServletResponse response) {

        var cookie = new Cookie(name, null);

        if (path != null) {
            cookie.setPath(path);
        }
        cookie.setMaxAge(-1000);
        response.addCookie(cookie);
    }
}
