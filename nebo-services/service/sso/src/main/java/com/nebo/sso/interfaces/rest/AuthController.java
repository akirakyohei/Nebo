package com.nebo.sso.interfaces.rest;

import com.nebo.sso.applications.model.JwtResponse;
import com.nebo.sso.applications.model.UserCreateRequest;
import com.nebo.sso.applications.model.UserLoginRequest;
import com.nebo.sso.applications.services.UserService;
import com.nebo.sso.infrastructures.config.NeboJwtConfigureProperties;
import com.nebo.sso.infrastructures.util.CookieUtils;
import com.nebo.web.applications.exception.AuthenticationException;
import com.nebo.web.applications.exception.ConstraintViolationException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    private final NeboJwtConfigureProperties jwtConfigureProperties;

    @PostMapping("/signup")
    public JwtResponse signup(@RequestBody @Valid UserCreateRequest request, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws ConstraintViolationException {
        var res = userService.signup(request);
        CookieUtils.addCookie(jwtConfigureProperties.getHeaderToken(), res.getToken(), "/*", httpServletRequest, httpServletResponse);
        return res;
    }

    @PostMapping("/signin")
    public JwtResponse signin(@RequestBody @Valid UserLoginRequest request, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws ConstraintViolationException, AuthenticationException {
        var res = userService.authenticate(request);
        CookieUtils.addCookie(jwtConfigureProperties.getHeaderToken(), res.getToken(), "/*", httpServletRequest, httpServletResponse);
        return res;
    }

}
