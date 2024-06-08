package com.nebo.reports.applications.service.mapper;

import com.nebo.reports.applications.model.User;
import com.nebo.reports.domain.model.DimUser;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface DimUserMapper {
    void updateUser(User user, @MappingTarget DimUser dimUser);
}
