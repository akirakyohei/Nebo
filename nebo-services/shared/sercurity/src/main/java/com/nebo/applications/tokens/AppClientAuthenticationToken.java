package com.nebo.applications.tokens;

import com.nebo.applications.constant.TokenType;
import com.nebo.applications.model.AppClientDetail;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;


@AllArgsConstructor
public class AppClientAuthenticationToken implements NeboAuthentication {

    private boolean isAuthenticated;
    private AppClientDetail appClientDetail;
    private String apiKey;
    private String apiSecret;

    public AppClientAuthenticationToken(String apiKey, String apiSecret) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
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
