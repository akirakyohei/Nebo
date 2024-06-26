package com.nebo.shared.security.tokens;

import com.nebo.shared.security.client.UserDetail;
import com.nebo.shared.security.constant.TokenType;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@AllArgsConstructor
public class JwtAuthenticationToken implements NeboAuthenticationToken {

    private boolean isAuthenticated;

    private UserDetail userDetail;

    private final String token;

    public JwtAuthenticationToken(String token) {
        this.token = token;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return userDetail.getAuthorities();
    }

    @Override
    public Object getCredentials() {
        return token;
    }

    @Override
    public Object getDetails() {
        return userDetail;
    }

    @Override
    public Object getPrincipal() {
        return userDetail;
    }

    @Override
    public boolean isAuthenticated() {
        return isAuthenticated;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {

    }

    @Override
    public String getName() {
        return userDetail.getUsername();
    }

    @Override
    public Long getUserId() {
        return userDetail.getUserId();
    }

    @Override
    public Long getAppId() {
        return null;
    }

    @Override
    public TokenType getTokenType() {
        return TokenType.cookie_token;
    }
}
