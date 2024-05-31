package com.nebo.shared.security.config;

import com.nebo.shared.security.constant.TokenType;
import com.nebo.shared.security.tokens.NeboAuthenticationToken;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.Assert;

public class TokenTypeRequestMatcher implements RequestMatcher {
    private final TokenType tokenType;

    public TokenTypeRequestMatcher(TokenType tokenType) {
        Assert.notNull(tokenType, "Token type cannot be null");
        this.tokenType = tokenType;
    }

    @Override
    public boolean matches(HttpServletRequest request) {
        var principal = request.getUserPrincipal();
        if (principal instanceof NeboAuthenticationToken user) {
            return tokenType.equals(user.getTokenType());
        }
        return false;
    }

    public static TokenTypeRequestMatcher matcher(TokenType tokenType) {
        return new TokenTypeRequestMatcher(tokenType);
    }
}
