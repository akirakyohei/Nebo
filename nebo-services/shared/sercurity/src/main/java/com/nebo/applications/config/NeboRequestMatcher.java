package com.nebo.applications.config;

import com.nebo.applications.constant.TokenType;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.log.LogMessage;
import org.springframework.http.HttpMethod;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

import java.util.regex.Pattern;

@Slf4j
public class NeboRequestMatcher implements RequestMatcher {

    private static final int DEFAULT = Pattern.DOTALL;

    private static final int CASE_INSENSITIVE = DEFAULT | Pattern.CASE_INSENSITIVE;
    private final TokenType tokenType;
    private final Pattern pattern;

    private final HttpMethod httpMethod;

    public static NeboRequestMatcher regexMatcher(TokenType tokenType, String pattern) {
        Assert.notNull(tokenType, "Token type cannot be null");
        Assert.hasText(pattern, "pattern cannot be empty");
        return new NeboRequestMatcher(tokenType, pattern, null);
    }


    public static NeboRequestMatcher regexMatcher(TokenType tokenType, HttpMethod method) {
        Assert.notNull(tokenType, "Token type cannot be null");
        Assert.notNull(method, "method cannot be null");
        return new NeboRequestMatcher(tokenType, ".*", method.name());
    }


    public static NeboRequestMatcher regexMatcher(TokenType tokenType, HttpMethod method, String pattern) {
        Assert.notNull(method, "method cannot be null");
        Assert.hasText(pattern, "pattern cannot be empty");
        return new NeboRequestMatcher(tokenType, pattern, method.name());
    }


    public NeboRequestMatcher(TokenType tokenType, String pattern, String httpMethod) {
        this(tokenType, pattern, httpMethod, false);
    }


    public NeboRequestMatcher(TokenType tokenType, String pattern, String httpMethod, boolean caseInsensitive) {
        this.tokenType = tokenType;
        this.pattern = Pattern.compile(pattern, caseInsensitive ? CASE_INSENSITIVE : DEFAULT);
        this.httpMethod = StringUtils.hasText(httpMethod) ? HttpMethod.valueOf(httpMethod) : null;
    }


    @Override
    public boolean matches(HttpServletRequest request) {
        if (this.httpMethod != null && request.getMethod() != null
                && this.httpMethod != HttpMethod.valueOf(request.getMethod())) {
            return false;
        }
        String url = request.getServletPath();
        String pathInfo = request.getPathInfo();
        String query = request.getQueryString();
        if (pathInfo != null || query != null) {
            StringBuilder sb = new StringBuilder(url);
            if (pathInfo != null) {
                sb.append(pathInfo);
            }
            if (query != null) {
                sb.append('?').append(query);
            }
            url = sb.toString();
        }
        log.debug("Checking match of request : '{}'; against '{}'", url, this.pattern);
        return this.pattern.matcher(url).matches();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Regex [pattern='").append(this.pattern).append("'");
        if (this.httpMethod != null) {
            sb.append(", ").append(this.httpMethod);
        }
        sb.append("]");
        return sb.toString();
    }
}
