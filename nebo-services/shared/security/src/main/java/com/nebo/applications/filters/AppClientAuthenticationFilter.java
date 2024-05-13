package com.nebo.applications.filters;

import com.nebo.applications.tokens.AppClientAuthenticationToken;
import com.nebo.applications.tokens.BasicAuthenticationToken;
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
public class AppClientAuthenticationFilter extends OncePerRequestFilter {
    private AuthenticationManager authenticationManager;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var apikey = request.getHeader("X-Nebo-Api-Key");
        var apiSecret = request.getHeader("X-Nebo-Secret-Key");
        if (apikey == null || apiSecret == null) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            var authentication = authenticationManager.authenticate(new AppClientAuthenticationToken(apikey, apiSecret));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);
        } catch (Exception ex) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            // If you want to immediatelly return an error response, you can do it like this:
            response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase());
        }
    }
}
