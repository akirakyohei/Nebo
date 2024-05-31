package com.nebo.sso.applications.services;

import com.nebo.sso.applications.model.ApiKeyDetailResponse;
import com.nebo.sso.applications.model.ApiKeyResponse;
import com.nebo.sso.infrastructures.domain.model.AppClient;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AppClientMapper {

    ApiKeyDetailResponse fromDomainToDetailResponse(AppClient appClient);

    ApiKeyResponse fromDomainToResponse(AppClient appClient);
}
