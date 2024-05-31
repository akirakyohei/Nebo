package com.nebo.shared.security.providers;

import com.nebo.shared.security.client.AppClientDetail;
import com.nebo.shared.security.services.AuthenticationService;
import com.nebo.shared.security.tokens.AppClientAuthenticationToken;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

@RequiredArgsConstructor
public class AppClientAuthenticationProvider implements AuthenticationProvider {
    private final AuthenticationService authenticationService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        var token = (String) authentication.getCredentials();
        var appClient = authenticationService.validateApiKey(token);
        if (appClient != null) {
            return new AppClientAuthenticationToken(true, new AppClientDetail(appClient), token);
        }
        return authentication;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(AppClientAuthenticationToken.class);
    }
}
