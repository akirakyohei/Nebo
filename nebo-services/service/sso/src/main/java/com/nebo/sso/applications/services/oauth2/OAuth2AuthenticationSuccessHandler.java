package com.nebo.sso.applications.services.oauth2;

import com.nebo.shared.security.config.NeboJwtConfigureProperties;
import com.nebo.sso.applications.model.UserDetailsImpl;
import com.nebo.sso.applications.services.AuthenticateProvider;
import com.nebo.sso.infrastructures.util.CookieUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final AuthenticateProvider authenticateProvider;

    private final NeboJwtConfigureProperties jwtConfigureProperties;

    @Value(" #{'${nebo.app.oauth2.authorizedRedirectUri}'.split(',')}")
    private List<String> authorizedRedirectUris;
    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    @SneakyThrows
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        var redirectUri = Optional.ofNullable(CookieUtils.getCookie(request, HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME)).map(Cookie::getValue);


        if (redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
            throw new BadRequestException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
        }
        var user = (UserDetailsImpl) authentication.getPrincipal();
        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());
        var ipAddress = request.getRemoteAddr();
        var userAgent = request.getHeader("User-Agent");
        var res = authenticateProvider.generateJwtToken(user, ipAddress, userAgent);
        CookieUtils.addCookie(jwtConfigureProperties.getHeaderToken(), res.getToken(), "/", res.getExpireAt(), request, response);
        CookieUtils.addCookie(jwtConfigureProperties.getHeaderRefreshToken(), res.getRefreshToken(), "/", res.getRefreshExpireAt(), request, response);
        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("token", res.getToken())
                .queryParam("refresh_token", res.getRefreshToken())
                .build().toUriString();
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private boolean isAuthorizedRedirectUri(String uri) {
        URI clientRedirectUri = URI.create(uri);

        return authorizedRedirectUris
                .stream()
                .anyMatch(authorizedRedirectUri -> {
                    // Only validate host and port. Let the clients use different paths if they want to
                    URI authorizedURI = URI.create(authorizedRedirectUri);
                    if (authorizedURI.getHost() == null)
                        return true;
                    if (authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                            && authorizedURI.getPort() == clientRedirectUri.getPort()) {
                        return true;
                    }
                    return false;
                });
    }
}