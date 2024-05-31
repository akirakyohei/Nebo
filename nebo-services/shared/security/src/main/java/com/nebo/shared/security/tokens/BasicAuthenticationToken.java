package com.nebo.shared.security.tokens;

import com.nebo.shared.security.constant.TokenType;
import com.nebo.shared.security.client.BasicAuthDetail;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;


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

    public BasicAuthenticationToken(boolean isAuthenticated, BasicAuthDetail basicAuthDetail, String token, Long userId, Long appId) {
        this.isAuthenticated = isAuthenticated;
        this.basicAuthDetail = basicAuthDetail;
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
        return token;
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
