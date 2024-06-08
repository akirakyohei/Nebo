package com.nebo.sso.interfaces.rest;

import com.nebo.shared.security.config.NeboJwtConfigureProperties;
import com.nebo.shared.security.constant.TokenType;
import com.nebo.shared.security.utils.NeboSecurityUtils;
import com.nebo.sso.applications.model.*;
import com.nebo.sso.applications.services.UserService;
import com.nebo.sso.infrastructures.util.CookieUtils;
import com.nebo.shared.web.applications.bind.UserId;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final NeboJwtConfigureProperties jwtConfigureProperties;

    @GetMapping("/current_user")
    public UserResponse getCurrentUser(@UserId Long userId) {
        return userService.getUser(userId);
    }

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable("id") Long userId) throws Exception {
        return userService.getUser(userId);
    }

    @PostMapping("/current_user")
    public UserResponse updateUser(@UserId Long userId, @RequestBody UserUpdateRequest request) throws Exception {
        return userService.update(userId, request);
    }

    @PostMapping("/change_password")
    public UserResponse changePassword(@UserId Long userId, @RequestBody UserChangePasswordRequest request, HttpServletResponse httpServletResponse) throws Exception {
        var res = userService.changePassword(userId, request);
        CookieUtils.removeCookie(jwtConfigureProperties.getHeaderToken(), "/*", httpServletResponse);
        CookieUtils.removeCookie(jwtConfigureProperties.getHeaderRefreshToken(), "/*", httpServletResponse);
        return res;
    }


    @GetMapping("")
    public UsersResponse getUsers(UserFilterRequest request) {
        var result = userService.getFilter(request);
        var token = NeboSecurityUtils.getTokenType();
        if (List.of(TokenType.cookie_token, TokenType.app_client).contains(token)) {
            var data = result.getData().stream().map(userResponse -> {
                var res = new UserResponse();
                res.setProvider(null);
                res.setPermissions(null);
                res.setProviderId(null);
                res.setEmail(null);
                return res;
            }).toList();
            result = new UsersResponse(new PageImpl<>(data, request.toPageable(), result.getMetadata().getTotalElement()));
        }
        return result;
    }

}
