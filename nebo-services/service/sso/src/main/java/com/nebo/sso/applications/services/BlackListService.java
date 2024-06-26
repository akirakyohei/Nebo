package com.nebo.sso.applications.services;

import com.nebo.shared.security.config.NeboJwtConfigureProperties;
import com.nebo.shared.web.applications.exception.NotFoundException;
import com.nebo.sso.domain.model.Session;
import com.nebo.sso.domain.repository.JpaSessionRepository;
import com.nebo.sso.domain.repository.JpaUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class BlackListService {

    private final NeboJwtConfigureProperties jwtProperties;

    private final RedisTemplate<Object, Object> redisTemplate;

    private final JpaUserRepository userRepository;

    private final JpaSessionRepository sessionRepository;


    public void blockByUserId(long userId) {
        userRepository.findById(userId).orElseThrow(NotFoundException::new);
        var sessions = sessionRepository.findAllByUserId(userId);
        blockTokens(userId, sessions.stream().map(Session::getToken).toList());
        sessionRepository.deleteAll(sessions);
    }

    public void blockByUserIdAndToken(long userId, String token) {
        sessionRepository.findByUserIdAndToken(userId, token).orElseThrow(NotFoundException::new);
        blockTokens(userId, List.of(token));
    }

    public boolean isBlackList(long userId, String token) {
        var blackList = redisTemplate.opsForValue().get(token);
        return blackList != null && blackList.equals(userId);
    }

    private void blockTokens(long userId, List<String> tokens) {
        tokens.forEach(token -> redisTemplate.opsForValue().set(token, userId, jwtProperties.getExpiration(), TimeUnit.MILLISECONDS));
    }
}
