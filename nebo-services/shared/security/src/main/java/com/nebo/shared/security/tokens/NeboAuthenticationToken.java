package com.nebo.shared.security.tokens;

import com.nebo.shared.security.constant.TokenType;
import org.springframework.security.core.Authentication;

public interface NeboAuthenticationToken extends Authentication {
    Long getUserId();

    Long getAppId();

    TokenType getTokenType();

}
