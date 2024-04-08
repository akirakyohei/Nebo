package com.nebo.applications.providers;

import com.nebo.applications.tokens.BasicAuthenticationToken;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public class BasicAuthenticationProvider implements AuthenticationProvider {
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        return authentication;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(BasicAuthenticationToken.class);
    }
}
