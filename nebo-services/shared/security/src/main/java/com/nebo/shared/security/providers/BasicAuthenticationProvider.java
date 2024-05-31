package com.nebo.shared.security.providers;

import com.nebo.shared.security.client.BasicAuthDetail;
import com.nebo.shared.security.services.AuthenticationService;
import com.nebo.shared.security.tokens.BasicAuthenticationToken;
import com.nebo.shared.security.tokens.NeboAuthenticationToken;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import java.util.List;

@RequiredArgsConstructor
public class BasicAuthenticationProvider implements AuthenticationProvider {

    private final AuthenticationService authenticationService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        var token = (String) authentication.getCredentials();
        var userId = ((NeboAuthenticationToken) authentication).getUserId();
        var appId = ((NeboAuthenticationToken) authentication).getAppId();
        if (authenticationService.validateBasicAuthToken(token)) {
            return new BasicAuthenticationToken(true, new BasicAuthDetail("interal_service", List.of()), token, userId, appId);
        }
        return authentication;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(BasicAuthenticationToken.class);
    }
}
