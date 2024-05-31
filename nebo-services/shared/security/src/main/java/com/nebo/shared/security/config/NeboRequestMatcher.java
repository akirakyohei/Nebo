package com.nebo.shared.security.config;

import com.nebo.shared.security.constant.TokenType;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatchers;
import org.springframework.util.Assert;

import java.util.Arrays;

@Slf4j
public class NeboRequestMatcher implements RequestMatcher {

    private final RequestMatcher requestMatchers;
    private final TokenTypeRequestMatcher tokenTypeRequestMatcher;

    public static NeboRequestMatcher matcher(TokenType tokenType, RequestMatcher... requestMatchers) {
        Assert.notNull(tokenType, "Token type cannot be null");
        Assert.notEmpty(requestMatchers, "Request Matchers cannot be empty");
        return new NeboRequestMatcher(tokenType, RequestMatchers.anyOf(requestMatchers));
    }

    public static NeboRequestMatcher matcher(TokenType tokenType, String pattern) {
        Assert.notNull(tokenType, "Token type cannot be null");
        Assert.hasText(pattern, "pattern cannot be empty");
        return new NeboRequestMatcher(tokenType, null, pattern);
    }


    public static NeboRequestMatcher matcher(TokenType tokenType, HttpMethod method) {
        Assert.notNull(tokenType, "Token type cannot be null");
        Assert.notNull(method, "method cannot be null");
        return new NeboRequestMatcher(tokenType, method, "/**");
    }


    public static NeboRequestMatcher matcher(TokenType tokenType, HttpMethod method, String... patterns) {
        Assert.notNull(method, "method cannot be null");
        Assert.notEmpty(patterns, "patterns cannot be empty");
        return new NeboRequestMatcher(tokenType, method, patterns);
    }

    public static NeboRequestMatcher matcher(TokenType tokenType, String... patterns) {
        Assert.notEmpty(patterns, "patterns cannot be empty");
        return new NeboRequestMatcher(tokenType, null, patterns);
    }

    public static NeboRequestMatcher matcher(TokenType tokenType, HttpMethod method, String pattern) {
        Assert.notNull(method, "method cannot be null");
        Assert.hasText(pattern, "pattern cannot be empty");
        return new NeboRequestMatcher(tokenType, method, pattern);
    }

    public NeboRequestMatcher(TokenType tokenType, RequestMatcher requestMatcher) {
        this.tokenTypeRequestMatcher = TokenTypeRequestMatcher.matcher(tokenType);
        this.requestMatchers = requestMatcher;
    }

    public NeboRequestMatcher(TokenType tokenType, HttpMethod httpMethod, String... patterns) {
        Assert.notEmpty(patterns, "pattern cannot be empty");
        this.tokenTypeRequestMatcher = TokenTypeRequestMatcher.matcher(tokenType);
        this.requestMatchers = RequestMatchers.anyOf(Arrays.stream(patterns)
                .map(pattern -> {
                    if (httpMethod == null) {
                        return AntPathRequestMatcher.antMatcher(pattern);
                    }
                    return AntPathRequestMatcher.antMatcher(httpMethod, pattern);
                })
                .toArray(RequestMatcher[]::new));
    }


    @Override
    public boolean matches(HttpServletRequest request) {
        return RequestMatchers.allOf(tokenTypeRequestMatcher, requestMatchers).matches(request);
    }
}
