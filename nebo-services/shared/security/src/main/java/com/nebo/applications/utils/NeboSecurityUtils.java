package com.nebo.applications.utils;

import com.nebo.applications.constant.TokenType;
import com.nebo.applications.tokens.NeboAuthenticationToken;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;

public class NeboSecurityUtils {

    public static boolean isOptionsRequest(HttpServletRequest request) {
        return HttpMethod.OPTIONS.matches(request.getMethod());
    }

    public static void setResponseForOptionsRequest(HttpServletResponse response) {
        response.setStatus(HttpStatus.OK.value());
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Max-Age", "600");
    }

    public static Long detectUserId() {
        var context = SecurityContextHolder.getContext();
        if (context == null || context.getAuthentication() == null)
            return null;
        var authentication = context.getAuthentication();
        if (authentication.getPrincipal()!=null && authentication instanceof NeboAuthenticationToken token) {
            return token.getUserId();
        }
        return null;
    }

    public static Long detectAppId() {
        var context = SecurityContextHolder.getContext();
        if (context == null || context.getAuthentication() == null)
            return null;
        var authentication = context.getAuthentication();
        if ( authentication.getPrincipal()!=null && authentication instanceof NeboAuthenticationToken token) {
            return token.getAppId();
        }
        return null;
    }

    public static TokenType getTokenType() {
        var context = SecurityContextHolder.getContext();
        if (context == null || context.getAuthentication() == null)
            return null;
        var authentication = context.getAuthentication();
        if (authentication.getPrincipal()!=null && authentication instanceof NeboAuthenticationToken token) {
            return token.getTokenType();
        }
        return null;
    }

    public static NeboAuthenticationToken getNeboAuthenticationToken() {
        var context = SecurityContextHolder.getContext();
        if (context == null || context.getAuthentication() == null)
            return null;
        var authentication = context.getAuthentication();
        var principal = authentication.getPrincipal();
        if (principal instanceof NeboAuthenticationToken token) {
            return token;
        }
        return null;
    }

    public static boolean isAuthenticated() {
        return SecurityContextHolder.getContext() != null &&
                SecurityContextHolder.getContext().getAuthentication() != null &&
                SecurityContextHolder.getContext().getAuthentication().isAuthenticated();
    }
}
