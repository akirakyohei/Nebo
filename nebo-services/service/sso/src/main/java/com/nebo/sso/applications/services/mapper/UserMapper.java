package com.nebo.sso.applications.services.mapper;

import com.nebo.sso.domain.model.User;
import com.nebo.sso.applications.model.UserCreateRequest;
import com.nebo.sso.applications.model.UserResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserCreateRequest request);

    UserResponse fromDomainToResponse(User user);
}
