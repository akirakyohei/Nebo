package com.nebo.sso.applications.model.oauth2;

import com.nebo.sso.infrastructures.domain.model.User;

import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase(User.AuthProvider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(User.AuthProvider.facebook.toString())) {
            return new FacebookOAuth2UserInfo(attributes);
        } else {
            throw new IllegalArgumentException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}
