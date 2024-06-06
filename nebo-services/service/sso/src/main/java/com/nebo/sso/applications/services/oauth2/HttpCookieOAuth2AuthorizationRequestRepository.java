package com.nebo.sso.applications.services.oauth2;

import com.nebo.sso.infrastructures.util.CookieUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Component;


@Component
public class HttpCookieOAuth2AuthorizationRequestRepository implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {
    public static final String OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME = "oauth2_auth_request";
    public static final String REDIRECT_URI_PARAM_COOKIE_NAME = "redirect_uri";

    @Override
    public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
        var cookie = CookieUtils.getCookie(request, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
        if (cookie != null)
            return CookieUtils.deserialize(cookie, OAuth2AuthorizationRequest.class);
        return null;
    }

    @Override
    public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest, HttpServletRequest request, HttpServletResponse response) {
        if (authorizationRequest == null) {
            CookieUtils.removeCookie(OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME, "/", response);
            CookieUtils.removeCookie(REDIRECT_URI_PARAM_COOKIE_NAME, "/", response);
            return;
        }

        CookieUtils.addCookie(OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME, CookieUtils.serialize(authorizationRequest), "/", null, request, response);
        String redirectUriAfterLogin = request.getParameter(REDIRECT_URI_PARAM_COOKIE_NAME);
        if (StringUtils.isNotBlank(redirectUriAfterLogin)) {
            CookieUtils.addCookie(REDIRECT_URI_PARAM_COOKIE_NAME, redirectUriAfterLogin, "/", null, request, response);
        }
    }

    @Override
    public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request, HttpServletResponse response) {
        return this.loadAuthorizationRequest(request);
    }

    public void removeAuthorizationRequestCookies(HttpServletRequest request, HttpServletResponse response) {
        CookieUtils.removeCookie(OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME, "/", response);
        CookieUtils.removeCookie(REDIRECT_URI_PARAM_COOKIE_NAME, "/", response);
    }
}