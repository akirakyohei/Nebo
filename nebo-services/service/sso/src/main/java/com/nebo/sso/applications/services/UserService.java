package com.nebo.sso.applications.services;

import com.google.i18n.phonenumbers.PhoneNumberUtil;
import com.nebo.sso.applications.model.JwtResponse;
import com.nebo.sso.applications.model.UserLoginRequest;
import com.nebo.sso.applications.model.UserCreateRequest;
import com.nebo.sso.applications.model.UserResponse;
import com.nebo.sso.infrastructures.domain.model.User;
import com.nebo.sso.infrastructures.domain.repository.JpaUserRepository;
import com.nebo.web.applications.exception.AuthenticationException;
import com.nebo.web.applications.exception.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class UserService {

    private final AuthenticateProvider authenticateProvider;

    private final PasswordEncoder passwordEncoder;

    private final JpaUserRepository userRepository;

    private final UserMapper userMapper;

    @Transactional
    public UserResponse create(UserCreateRequest request) throws ConstraintViolationException {
        validateCreateRequest(request);
        var user = userMapper.toUser(request);
        user.setProvider(User.AuthProvider.local);
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    @Transactional
    public JwtResponse signup(UserCreateRequest request) throws ConstraintViolationException {
        validateCreateRequest(request);
        var user = userMapper.toUser(request);
        user.setProvider(User.AuthProvider.local);
        user = userRepository.save(user);
        return authenticateProvider.generateJwtToken(user);
    }


    public JwtResponse authenticate(UserLoginRequest request) throws AuthenticationException, ConstraintViolationException {
        var user = validateLoginRequest(request);
        return authenticateProvider.generateJwtToken(user);
    }

    private void validateCreateRequest(UserCreateRequest request) throws ConstraintViolationException {
        if (request.getPhoneNumber() == null || request.getEmail() == null)
            throw new ConstraintViolationException("user", "Required email or phone number");
        if (request.getPhoneNumber() != null) {
            request.setPhoneNumber(PhoneNumberUtil.normalizeDigitsOnly(request.getPhoneNumber()));
        }
        request.setFirstName(request.getFirstName().trim());
        if (request.getLastName() != null)
            request.setLastName(request.getLastName().trim());
        if (request.getPassword() != null) {
            request.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        if (request.getEmail() != null) {
            if (userRepository.findFirstByEmail(request.getEmail()).isEmpty())
                throw new ConstraintViolationException("user", "Email already existed");
        }
        if (request.getPhoneNumber() != null) {
            if (userRepository.findFirstByPhoneNumber(request.getPhoneNumber()).isEmpty())
                throw new ConstraintViolationException("user", "Phone number already existed");
        }
    }

    private User validateLoginRequest(UserLoginRequest request) throws ConstraintViolationException, AuthenticationException {
        if (request.getPhoneNumber() == null || request.getEmail() == null)
            throw new ConstraintViolationException("user", "Required email or phone number");
        if (request.getPhoneNumber() != null) {
            request.setPhoneNumber(PhoneNumberUtil.normalizeDigitsOnly(request.getPhoneNumber()));
        }
        if (request.getPassword() != null) {
            request.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        if (request.getEmail() != null) {
            var user = userRepository.findFirstByEmailAndPassword(request.getEmail(), request.getPassword())
                    .orElse(null);
            if (user == null)
                throw new AuthenticationException("Email or password incorrect");
            return user;
        }
        if (request.getPhoneNumber() != null) {
            var user = userRepository.findFirstByPhoneNumberAndPassword(request.getPhoneNumber(), request.getPassword())
                    .orElse(null);
            if (user == null)
                throw new AuthenticationException("Phone number or password incorrect");
            return user;
        }
        throw new UnsupportedOperationException();
    }
}
