package com.nebo.sso.applications.services.mapper;

import com.nebo.sso.domain.model.AppClient;
import com.nebo.sso.applications.model.ApiKeyDetailResponse;
import com.nebo.sso.applications.model.ApiKeyResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AppClientMapper {

    ApiKeyDetailResponse fromDomainToDetailResponse(AppClient appClient);

    ApiKeyResponse fromDomainToResponse(AppClient appClient);
}
