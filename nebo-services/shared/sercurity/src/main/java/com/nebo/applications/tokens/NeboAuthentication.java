package com.nebo.applications.tokens;

import com.nebo.applications.constant.TokenType;
import org.springframework.security.core.Authentication;

public interface NeboAuthentication extends Authentication {
    Long getUserId();

    Long getAppId();

    TokenType getTokenType();

}
