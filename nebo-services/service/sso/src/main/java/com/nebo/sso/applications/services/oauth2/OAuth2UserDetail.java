package com.nebo.sso.applications.services.oauth2;

import com.nebo.sso.applications.model.UserDetailsImpl;
import com.nebo.sso.infrastructures.domain.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;

public class OAuth2UserDetail extends UserDetailsImpl implements OAuth2User {

    private Map<String, Object> attributes;

    public OAuth2UserDetail(User user, Map<String, Object> attributes) {
        super(user);
        this.attributes = attributes;
    }

    public OAuth2UserDetail(User user) {
        super(user);
    }

    public static OAuth2UserDetail create(User user) {

        return new OAuth2UserDetail(user);
    }

    public static OAuth2UserDetail create(User user, Map<String, Object> attributes) {
        var userPrincipal = OAuth2UserDetail.create(user);
        userPrincipal.setAttributes(attributes);
        return userPrincipal;
    }

    public long getId() {
        return user.getId();
    }

    public String getEmail() {
        return user.getEmail();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (user.getPermissions() == null)
            return null;
        return user.getPermissions().stream()
//                .map(permission -> "ROLE_" + permission)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getName() {
        return user.getFirstName();
    }
}
