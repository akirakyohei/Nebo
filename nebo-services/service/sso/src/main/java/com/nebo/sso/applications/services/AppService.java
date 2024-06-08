package com.nebo.sso.applications.services;

import com.nebo.lib.feignclient.client.B;
import com.nebo.lib.feignclient.client.NeboFeignClient;
import com.nebo.shared.web.applications.exception.NotFoundException;
import com.nebo.sso.domain.model.AppClient;
import com.nebo.sso.domain.model.AppClient_;
import com.nebo.sso.domain.repository.JpaAppClientRepository;
import com.nebo.sso.applications.model.ApiKeyDetailResponse;
import com.nebo.sso.applications.model.ApiKeyFilterRequest;
import com.nebo.sso.applications.model.ApiKeyRequest;
import com.nebo.sso.applications.model.ApiKeysResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppService {

    private final JpaAppClientRepository appClientRepository;

    private final AppClientMapper appClientMapper;
    private final NeboFeignClient neboFeignClient;

    @Transactional
    public ApiKeyDetailResponse createApiKey(long userId, ApiKeyRequest request) {
        var appClient = new AppClient(userId, StringUtils.defaultIfBlank(request.getName(), ""), generateApiKey());
        appClientRepository.save(appClient);
        return appClientMapper.fromDomainToDetailResponse(appClient);
    }

    @Transactional
    public ApiKeyDetailResponse updateApiKey(long userId, long id, ApiKeyRequest request) {
        var appClient = appClientRepository.findAppClientByUserIdAndId(userId, id).orElseThrow(NotFoundException::new);
        if (request.getName() != null)
            appClient.setName(request.getName());
        if (request.getStatus() != null)
            appClient.setStatus(request.getStatus());
        appClientRepository.save(appClient);
        return appClientMapper.fromDomainToDetailResponse(appClient);
    }

    public ApiKeyDetailResponse getApiKeyByAccessToken(String accessToken) {
        var appClient = appClientRepository.findAppClientByAccessToken(accessToken).orElseThrow(NotFoundException::new);
        return appClientMapper.fromDomainToDetailResponse(appClient);
    }

    public ApiKeyDetailResponse getApiKeyById(long userId, long id) {
        var appClient = appClientRepository.findAppClientByUserIdAndId(userId, id).orElseThrow(NotFoundException::new);
        return appClientMapper.fromDomainToDetailResponse(appClient);
    }

    public ApiKeysResponse getApiKeys(long userId, ApiKeyFilterRequest request) {
        var pageable = request.toPageable(Sort.by(Sort.Direction.DESC, AppClient_.CREATED_AT));
        var page = appClientRepository.findAllByUserId(userId, pageable);
        return new ApiKeysResponse(page.map(appClientMapper::fromDomainToResponse));
    }

    @Transactional
    public void deleteApiKey(long userId, long id) {
        var appClient = appClientRepository.findAppClientByUserIdAndId(userId, id).orElseThrow(NotFoundException::new);
        appClientRepository.delete(appClient);
        try {
            neboFeignClient.removeTemplateAppPermission(id, B.withUserId(userId));
        } catch (Exception ex) {
        }
    }

    private String generateApiKey() {
        return UUID.randomUUID().toString();
    }

}
