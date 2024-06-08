package com.nebo.sso.interfaces.rest;

import com.nebo.sso.applications.model.ApiKeyDetailResponse;
import com.nebo.sso.applications.model.ApiKeyFilterRequest;
import com.nebo.sso.applications.model.ApiKeyRequest;
import com.nebo.sso.applications.model.ApiKeysResponse;
import com.nebo.sso.applications.services.AppService;
import com.nebo.shared.web.applications.bind.UserId;
import com.nebo.shared.web.applications.exception.ConstraintViolationException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/api_apps")
public class ApiAppController {
    private final AppService appService;

    @PostMapping
    public ApiKeyDetailResponse createApiApp(@UserId long userId, @RequestBody @Valid ApiKeyRequest request) throws ConstraintViolationException {
        return appService.createApiKey(userId, request);
    }

    @PutMapping("/{id}")
    public ApiKeyDetailResponse updateApiApp(@UserId long userId, @PathVariable("id") int id, @RequestBody @Valid ApiKeyRequest request) throws ConstraintViolationException {
        return appService.updateApiKey(userId, id, request);
    }

    @GetMapping("/{id}")
    public ApiKeyDetailResponse getApiApp(@UserId long userId, @PathVariable("id") int id) {
        return appService.getApiKeyById(userId, id);
    }

    @GetMapping
    public ApiKeysResponse getApiApps(@UserId long userId, ApiKeyFilterRequest request) {
        return appService.getApiKeys(userId, request);
    }

    @DeleteMapping("/{id}")
    public void deleteTemplate(@UserId long userId, @PathVariable("id") int id) {
        appService.deleteApiKey(userId, id);
    }


}
