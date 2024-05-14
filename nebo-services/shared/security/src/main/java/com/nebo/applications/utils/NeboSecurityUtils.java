package com.nebo.applications.utils;

import com.nebo.applications.constant.TokenType;
import com.nebo.applications.tokens.NeboAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

public class NeboSecurityUtils {
    public static Long detectUserId() {
        var context = SecurityContextHolder.getContext();
        if (context == null || context.getAuthentication() == null)
            return null;
        var authentication = context.getAuthentication();
        var principal = authentication.getPrincipal();
        if (principal instanceof NeboAuthenticationToken token) {
            return token.getUserId();
        }
        return null;
    }

    public static Long detectAppId() {
        var context = SecurityContextHolder.getContext();
        if (context == null || context.getAuthentication() == null)
            return null;
        var authentication = context.getAuthentication();
        var principal = authentication.getPrincipal();
        if (principal instanceof NeboAuthenticationToken token) {
            return token.getAppId();
        }
        return null;
    }

    public static TokenType getTokenType() {
        var context = SecurityContextHolder.getContext();
        if (context == null || context.getAuthentication() == null)
            return null;
        var authentication = context.getAuthentication();
        var principal = authentication.getPrincipal();
        if (principal instanceof NeboAuthenticationToken token) {
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
