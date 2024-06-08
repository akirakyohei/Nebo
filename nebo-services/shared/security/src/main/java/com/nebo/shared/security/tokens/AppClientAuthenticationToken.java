package com.nebo.shared.security.tokens;

import com.nebo.shared.security.client.AppClientDetail;
import com.nebo.shared.security.constant.TokenType;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;


@AllArgsConstructor
public class AppClientAuthenticationToken implements NeboAuthenticationToken {

    private boolean isAuthenticated;
    private AppClientDetail appClientDetail;
    private String apiKey;

    public AppClientAuthenticationToken(String apiKey) {
        this.apiKey = apiKey;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return appClientDetail.getAuthorities();
    }

    @Override
    public Object getCredentials() {
        return apiKey;
    }

    @Override
    public Object getDetails() {
        return appClientDetail;
    }

    @Override
    public Object getPrincipal() {
        return appClientDetail;
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
        return appClientDetail.getUsername();
    }

    @Override
    public Long getUserId() {
        return appClientDetail.getUserId();
    }

    @Override
    public Long getAppId() {
        return appClientDetail.getAppId();
    }

    @Override
    public TokenType getTokenType() {
        return TokenType.app_client;
    }
}
