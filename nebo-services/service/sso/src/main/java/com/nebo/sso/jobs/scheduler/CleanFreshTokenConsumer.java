package com.nebo.sso.jobs.scheduler;

import com.nebo.sso.applications.services.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@EnableScheduling
public class CleanFreshTokenConsumer {

    private final RefreshTokenService refreshTokenService;

    @Scheduled(cron = "0 0 0/2 * * ?")
    public void process() {
        refreshTokenService.cleanRefreshTokenExpired();
    }


}
