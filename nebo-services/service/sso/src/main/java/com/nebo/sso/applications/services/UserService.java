package com.nebo.sso.applications.services;

import com.google.i18n.phonenumbers.PhoneNumberUtil;
import com.nebo.lib.feignclient.client.B;
import com.nebo.lib.feignclient.client.NeboFeignClient;
import com.nebo.lib.feignclient.client.model.FileDataUploadRequest;
import com.nebo.sso.applications.services.mapper.UserMapper;
import com.nebo.sso.domain.model.User;
import com.nebo.sso.domain.model.User_;
import com.nebo.sso.domain.repository.JpaUserRepository;
import com.nebo.sso.domain.specifiation.UserSpecification;
import com.nebo.shared.common.utils.IOUtils;
import com.nebo.shared.common.utils.MediaUtils;
import com.nebo.shared.web.applications.exception.AuthenticationException;
import com.nebo.shared.web.applications.exception.ConstraintViolationException;
import com.nebo.shared.web.applications.exception.ExpiredTokenRefreshException;
import com.nebo.shared.web.applications.exception.NotFoundException;
import com.nebo.sso.applications.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserService {

    private final NeboFeignClient neboFeignClient;

    private final AuthenticateProvider authenticateProvider;

    private final PasswordEncoder passwordEncoder;

    private final JpaUserRepository userRepository;

    private final UserMapper userMapper;

    private final BlackListService blackListService;

    @Transactional
    public UserResponse create(UserCreateRequest request) throws ConstraintViolationException {
        validateCreateRequest(request);
        var user = userMapper.toUser(request);
        user.setProvider(User.AuthProvider.local);
        userRepository.save(user);
        if (request.getAvatar() != null) {
            try {
                var res = neboFeignClient.uploadFile(FileDataUploadRequest.builder()
                        .file(FileDataUploadRequest.FileDataUpload.builder()
                                .contentType(request.getAvatar().getContentType())
                                .key(MediaUtils.buildMediaKey(user.getId(), "avatar." + IOUtils.getExtension(request.getAvatar().getContentType()), "avatar"))
                                .name("avatar." + IOUtils.getExtension(request.getAvatar().getContentType()))
                                .data(request.getAvatar().getData())
                                .build())
                        .build(), B.withUserId(user.getId())).getFile();
                user.setAvatarId(res.getId());
                user.setAvatarUrl(res.getKey());
                user = userRepository.save(user);
            } catch (Exception ex) {
            }
        }
        return getUser(user.getId());
    }

    @Transactional
    public UserResponse update(long userId, UserUpdateRequest request) throws ConstraintViolationException {
        var user = userRepository.findById(userId).orElseThrow(NotFoundException::new);
        var needConfirmPassword = false;
        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName().get());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName().get());
        }
        if (request.getEmail() != null && !StringUtils.equals(request.getEmail().get(), user.getEmail())) {
            if (request.getEmail().get() != null) {
                var existUser = userRepository.findFirstByEmail(request.getEmail().get()).orElse(null);
                if (existUser != null)
                    throw new ConstraintViolationException("email", "Email already used");
            }
            user.setEmail(request.getEmail().get());
            needConfirmPassword = true;
        }

        if (request.getPhoneNumber() != null && !StringUtils.equals(request.getPhoneNumber().get(), user.getPhoneNumber())) {
            if (request.getPhoneNumber().get() != null) {
                var existUser = userRepository.findFirstByPhoneNumber(request.getPhoneNumber().get()).orElse(null);
                if (existUser != null)
                    throw new ConstraintViolationException("phone_number", "Phone number already used");
            }
            user.setPhoneNumber(request.getPhoneNumber().get());
            needConfirmPassword = true;
        }
        if (needConfirmPassword) {
            if (request.getConfirmPassword() == null || !passwordEncoder.matches(request.getConfirmPassword(), user.getPassword()))
                throw new AccessDeniedException("Required password access denied");
        }
        if (user.getEmail() == null && user.getPhoneNumber() == null)
            throw new ConstraintViolationException("credential", "require email or phone number not null");

        if (request.getAvatar() != null) {
            try {
                if (user.getAvatarId() != null) {
                    neboFeignClient.deleteFileMetadata(user.getAvatarId(), B.withUserId(userId));
                }
                var res = neboFeignClient.uploadFile(FileDataUploadRequest.builder()
                        .file(FileDataUploadRequest.FileDataUpload.builder()
                                .contentType(request.getAvatar().getContentType())
                                .key(MediaUtils.buildMediaKey(user.getId(), "avatar." + IOUtils.getExtension(request.getAvatar().getContentType()), "avatar"))
                                .name("avatar." + IOUtils.getExtension(request.getAvatar().getContentType()))
                                .data(request.getAvatar().getData())
                                .build())
                        .build(), B.withUserId(user.getId())).getFile();
                user.setAvatarId(res.getId());
                user.setAvatarUrl(res.getKey());

            } catch (Exception ex) {
                log.error("", ex);
            }
        }
        userRepository.save(user);
        return getUser(userId);
    }

    @Transactional
    public UserResponse changePassword(long userId, UserChangePasswordRequest request) throws ConstraintViolationException {
        var user = userRepository.findById(userId).orElseThrow(NotFoundException::new);
        if (!passwordEncoder.matches(request.getConfirmPassword(), user.getPassword()))
            throw new AccessDeniedException("Required password access denied");

        if (passwordEncoder.matches(request.getPassword(), user.getPassword()))
            throw new ConstraintViolationException("new_password", "New password not same old password");
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        blackListService.blockByUserId(userId);
        return getUser(userId);
    }

    public UserResponse getUser(long userId) {
        var user = userRepository.findById(userId).orElseThrow(NotFoundException::new);
        var res = userMapper.fromDomainToResponse(user);
        return res;
    }

    public UsersResponse getFilter(UserFilterRequest request) {
        var spec = UserSpecification.toFilter(request);
        var page = userRepository.findAll(spec, request.toPageable(Sort.by(Sort.Direction.DESC, User_.CREATED_AT)));
        return new UsersResponse(page.map(userMapper::fromDomainToResponse));
    }


    @Transactional
    public UserResponse changeStatus(long userId, boolean status) {
        var user = userRepository.findById(userId).orElseThrow(NotFoundException::new);
        userRepository.save(user);
        return getUser(userId);
    }

    @Transactional
    public JwtResponse signup(UserCreateRequest request, String ipAddress, String userAgent) throws
            ConstraintViolationException {
        validateCreateRequest(request);
        var user = userMapper.toUser(request);
        user.setProvider(User.AuthProvider.local);
        user = userRepository.save(user);
        return authenticateProvider.generateJwtToken(user, ipAddress, userAgent);
    }


    public JwtResponse authenticate(Long userId, UserLoginRequest request, String ipAddress, String userAgent) throws
            AuthenticationException, ConstraintViolationException {
        var user = validateLoginRequest(request);
        if (Objects.equals(userId, user.getId()))
            throw new ConstraintViolationException("authenticated", "Authenticated");
        return authenticateProvider.generateJwtToken(user, ipAddress, userAgent);
    }

    public JwtResponse refreshJwtToken(User user, String refreshToken) throws ExpiredTokenRefreshException {
        return authenticateProvider.refreshJwtToken(user, refreshToken);
    }

    private void validateCreateRequest(UserCreateRequest request) throws ConstraintViolationException {
        if (request.getPhoneNumber() == null && request.getEmail() == null)
            throw new ConstraintViolationException("user", "Required email or phone number");
        if (request.getPhoneNumber() != null)
            request.setPhoneNumber(PhoneNumberUtil.normalizeDigitsOnly(request.getPhoneNumber()));
        request.setFirstName(request.getFirstName().trim());
        if (request.getLastName() != null)
            request.setLastName(request.getLastName().trim());
        if (request.getPassword() != null) {
            request.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        if (request.getEmail() != null) {
            if (userRepository.findFirstByEmail(request.getEmail()).isPresent())
                throw new ConstraintViolationException("user", "Email already existed");
        }
        if (request.getPhoneNumber() != null) {
            if (userRepository.findFirstByPhoneNumber(request.getPhoneNumber()).isPresent())
                throw new ConstraintViolationException("user", "Phone number already existed");
        }
    }

    private User validateLoginRequest(UserLoginRequest request) throws
            ConstraintViolationException, AuthenticationException {
        if (request.getPhoneNumber() == null && request.getEmail() == null)
            throw new ConstraintViolationException("user", "Required email or phone number");
        if (request.getPhoneNumber() != null) {
            request.setPhoneNumber(PhoneNumberUtil.normalizeDigitsOnly(request.getPhoneNumber()));
        }
        if (request.getEmail() != null) {
            var user = userRepository.findFirstByEmail(request.getEmail())
                    .orElse(null);
            if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword()))
                throw new AuthenticationException("Email or password incorrect");
            return user;
        }
        if (request.getPhoneNumber() != null) {
            var user = userRepository.findFirstByPhoneNumber(request.getPhoneNumber())
                    .orElse(null);
            if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword()))
                throw new AuthenticationException("Phone number or password incorrect");
            return user;
        }
        throw new UnsupportedOperationException();
    }
}
