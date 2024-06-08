package com.nebo.sso.interfaces.rest;

import com.nebo.shared.security.config.NeboJwtConfigureProperties;
import com.nebo.sso.applications.services.UserService;
import com.nebo.sso.applications.model.JwtResponse;
import com.nebo.sso.applications.model.UserCreateRequest;
import com.nebo.sso.applications.model.UserLoginRequest;
import com.nebo.sso.applications.services.BlackListService;
import com.nebo.sso.applications.services.RefreshTokenService;
import com.nebo.sso.infrastructures.util.CookieUtils;
import com.nebo.shared.web.applications.bind.UserId;
import com.nebo.shared.web.applications.exception.AuthenticationException;
import com.nebo.shared.web.applications.exception.ConstraintViolationException;
import com.nebo.shared.web.applications.exception.ExpiredTokenRefreshException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final RefreshTokenService refreshTokenService;
    private final BlackListService blackListService;
    private final NeboJwtConfigureProperties jwtConfigureProperties;

    @PostMapping("/signup")
    @Validated
    public JwtResponse signup(@RequestBody @Valid UserCreateRequest request, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws ConstraintViolationException {
        var ipAddress = httpServletRequest.getRemoteAddr();
        var userAgent = httpServletRequest.getHeader("User-Agent");
        var res = userService.signup(request, ipAddress, userAgent);
        CookieUtils.addCookie(jwtConfigureProperties.getHeaderToken(), res.getToken(), "/", res.getExpireAt(), httpServletRequest, httpServletResponse);
        CookieUtils.addCookie(jwtConfigureProperties.getHeaderRefreshToken(), res.getRefreshToken(), "/", res.getRefreshExpireAt(), httpServletRequest, httpServletResponse);

        return res;
    }

    @PostMapping("/signin")
    public JwtResponse signin(@UserId Long userId, @RequestBody @Valid UserLoginRequest request, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws ConstraintViolationException, AuthenticationException {
        var ipAddress = httpServletRequest.getRemoteAddr();
        var userAgent = httpServletRequest.getHeader("User-Agent");
        var res = userService.authenticate(userId, request, ipAddress, userAgent);
        CookieUtils.addCookie(jwtConfigureProperties.getHeaderToken(), res.getToken(), "/", res.getExpireAt(), httpServletRequest, httpServletResponse);
        CookieUtils.addCookie(jwtConfigureProperties.getHeaderRefreshToken(), res.getRefreshToken(), "/", res.getRefreshExpireAt(), httpServletRequest, httpServletResponse);
        return res;
    }

    @PostMapping("/refresh_token")
    public JwtResponse refreshToken(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, ExpiredTokenRefreshException {
        var refreshToken = CookieUtils.getCookie(httpServletRequest, jwtConfigureProperties.getHeaderRefreshToken());
        if (refreshToken == null)
            throw new AuthenticationException();
        var session = refreshTokenService.verifyExpiration(refreshToken.getValue());
        var res = userService.refreshJwtToken(session.getUser(), refreshToken.getValue());
        CookieUtils.addCookie(jwtConfigureProperties.getHeaderToken(), res.getToken(), "/", res.getExpireAt(), httpServletRequest, httpServletResponse);
        return res;
    }

    @PostMapping("/logout")
    public void logout(@UserId long userId, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        var token = CookieUtils.getCookie(httpServletRequest, jwtConfigureProperties.getHeaderToken());
        blackListService.blockByUserIdAndToken(userId, token.getValue());
        refreshTokenService.deleteByUserId(userId, token.getValue());
        CookieUtils.removeCookie(jwtConfigureProperties.getHeaderToken(), "/*", httpServletResponse);
        CookieUtils.removeCookie(jwtConfigureProperties.getHeaderRefreshToken(), "/*", httpServletResponse);
    }

}
