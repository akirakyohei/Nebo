package com.nebo.applications.filters;

import com.nebo.applications.tokens.BasicAuthenticationToken;
import com.nebo.applications.utils.NeboSecurityUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@AllArgsConstructor
public class BasicAuthenticationFilter extends OncePerRequestFilter {

    private AuthenticationManager authenticationManager;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if(NeboSecurityUtils.isOptionsRequest(request)){
            NeboSecurityUtils.setResponseForOptionsRequest(response);
            return;
        }
        var token = request.getHeader("Authorization");
        var userIdStr = request.getHeader("X-Author-Id");
        var appIdStr = request.getHeader("X-App-Id");
        var userId = NumberUtils.isCreatable(userIdStr) ? NumberUtils.createLong(userIdStr) : null;
        var appId = NumberUtils.isCreatable(appIdStr) ? NumberUtils.createLong(appIdStr) : null;
        if (token == null || NeboSecurityUtils.isAuthenticated()) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            var authentication = authenticationManager.authenticate(new BasicAuthenticationToken(token, userId, appId));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception ex) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            // If you want to immediatelly return an error response, you can do it like this:
            response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase());
        }
        filterChain.doFilter(request, response);
    }
}
