package com.nebo.sso.applications.services;

import com.nebo.sso.applications.model.UserCreateRequest;
import com.nebo.sso.applications.model.UserResponse;
import com.nebo.sso.infrastructures.domain.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserCreateRequest request);

    UserResponse toUserResponse(User user);
}
