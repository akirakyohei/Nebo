package com.nebo.sso.applications.services.oauth2;

import com.nebo.sso.applications.model.oauth2.OAuth2UserInfo;
import com.nebo.sso.infrastructures.domain.model.User;
import com.nebo.sso.infrastructures.domain.repository.JpaUserRepository;
import com.nebo.sso.applications.model.oauth2.OAuth2UserInfoFactory;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final JpaUserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        var oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if (StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new IllegalArgumentException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findFirstByEmail(oAuth2UserInfo.getEmail());
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
            if (!user.getProvider().equals(User.AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new IllegalArgumentException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return OAuth2UserDetail.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = new User();

        user.setProvider(User.AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setProviderId(oAuth2UserInfo.getId());
        user.setFirstName(oAuth2UserInfo.getFirstName());
        user.setLastName(oAuth2UserInfo.getLastName());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setAvatarUrl(oAuth2UserInfo.getImageUrl());
        return userRepository.save(user);
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setFirstName(oAuth2UserInfo.getFirstName());
        existingUser.setLastName(oAuth2UserInfo.getLastName());
        existingUser.setAvatarUrl(oAuth2UserInfo.getImageUrl());
        return userRepository.save(existingUser);
    }
}
