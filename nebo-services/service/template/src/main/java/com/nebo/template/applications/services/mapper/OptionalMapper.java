package com.nebo.template.applications.services.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.Optional;

@Mapper(componentModel = "spring")
public class OptionalMapper {

    @Named("optional")
    public <T> T fromOptional(Optional<T> optional) {
        return optional != null && optional.isPresent() ? optional.get() : null;
    }
}
