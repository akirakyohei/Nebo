package com.nebo.sso.applications.services;

import com.nebo.applications.config.NeboJwtConfigureProperties;
import com.nebo.sso.infrastructures.domain.model.Session;
import com.nebo.sso.infrastructures.domain.repository.JpaSessionRepository;
import com.nebo.sso.infrastructures.domain.repository.JpaUserRepository;
import com.nebo.web.applications.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

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
