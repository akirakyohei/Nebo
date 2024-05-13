package com.nebo.applications.tokens;

import com.nebo.applications.constant.TokenType;
import org.springframework.security.core.Authentication;

public interface NeboAuthenticationToken extends Authentication {
    Long getUserId();

    Long getAppId();

    TokenType getTokenType();

}
