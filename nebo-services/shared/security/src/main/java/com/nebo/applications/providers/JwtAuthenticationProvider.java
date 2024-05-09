package com.nebo.applications.providers;

import com.nebo.applications.model.UserDetail;
import com.nebo.applications.services.AuthenticationService;
import com.nebo.applications.tokens.JwtAuthenticationToken;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

@RequiredArgsConstructor
public class JwtAuthenticationProvider implements AuthenticationProvider {

    private final AuthenticationService authenticationService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        var token = (String) authentication.getCredentials();
        if (authenticationService.validateJwtToken(token)) {
            var credentialResponse = authenticationService.getUserCredential(token);
            return new JwtAuthenticationToken(true, new UserDetail(credentialResponse), token);
        }
        return authentication;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(JwtAuthenticationToken.class);
    }
}
