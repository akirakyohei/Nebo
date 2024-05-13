package com.nebo.applications.tokens;

import com.nebo.applications.constant.TokenType;
import com.nebo.applications.model.BasicAuthDetail;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@AllArgsConstructor
public class BasicAuthenticationToken implements NeboAuthenticationToken {

    private boolean isAuthenticated;
    private BasicAuthDetail basicAuthDetail;
    private String token;
    private Long userId;
    private Long appId;

    public BasicAuthenticationToken(String token, Long userId, Long appId) {
        this.token = token;
        this.userId = userId;
        this.appId = appId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return basicAuthDetail.getAuthorities();
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getDetails() {
        return basicAuthDetail;
    }

    @Override
    public Object getPrincipal() {
        return basicAuthDetail;
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
        return basicAuthDetail.getUsername();
    }

    @Override
    public Long getUserId() {
        return userId;
    }

    @Override
    public Long getAppId() {
        return appId;
    }

    @Override
    public TokenType getTokenType() {
        return TokenType.basic_auth;
    }
}
