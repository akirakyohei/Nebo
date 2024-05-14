package com.nebo.applications.filters;

import com.nebo.applications.tokens.JwtAuthenticationToken;
import com.nebo.applications.utils.CookieUtils;
import com.nebo.applications.utils.NeboSecurityUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private AuthenticationManager authenticationManager;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = request.getHeader("X-Nebo-Access-Token");
        if (token == null) {
            token = CookieUtils.getCookieByName(request, "X-Nebo-Access-Token");
        }

        if (token == null || NeboSecurityUtils.isAuthenticated()) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            var authentication = authenticationManager.authenticate(new JwtAuthenticationToken(token));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);
        } catch (Exception ex) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            // If you want to immediatelly return an error response, you can do it like this:
            response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase());
        }

    }
}
