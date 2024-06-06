package com.nebo.sso.infrastructures.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.SerializationUtils;

import java.time.Instant;
import java.util.Arrays;
import java.util.Base64;

public class CookieUtils {
    public static Cookie getCookie(HttpServletRequest request, String name) {
        var cookies = request.getCookies();
        if (cookies == null || StringUtils.isEmpty(name)) {
            return null;
        }
        return Arrays.stream(cookies).filter(cookie -> StringUtils.equals(cookie.getName(), name))
                .findFirst().orElse(null);
    }

    public static void addCookie(String name, String value, String path, Instant expireAt, HttpServletRequest request, HttpServletResponse response) {
        var cookie = new Cookie(name, value);
        if (path != null)
            cookie.setPath(path);

        if ("https".equals(request.getScheme()))
            cookie.setSecure(true);
        if (expireAt != null)
            cookie.setMaxAge((int) expireAt.minusSeconds(Instant.now().getEpochSecond()).getEpochSecond());
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

    public static String serialize(Object object) {
        return Base64.getUrlEncoder()
                .encodeToString(SerializationUtils.serialize(object));
    }

    public static <T> T deserialize(Cookie cookie, Class<T> cls) {
        return cls.cast(SerializationUtils.deserialize(
                Base64.getUrlDecoder().decode(cookie.getValue())));
    }
}
