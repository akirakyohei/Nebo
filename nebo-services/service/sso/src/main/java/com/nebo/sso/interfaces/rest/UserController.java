package com.nebo.sso.interfaces.rest;

import com.nebo.sso.applications.model.UserResponse;
import com.nebo.sso.applications.services.UserService;
import com.nebo.web.applications.bind.UserId;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/current_user")
    public UserResponse getCurrentUser(@UserId Long userId) {
        return userService.getUser(userId);
    }

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable("id") Long userId) throws Exception {
        return userService.getUser(userId);
    }

}
