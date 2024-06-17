package com.nebo.lib.feignclient.client.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;
import org.springframework.data.domain.Page;

import java.util.List;

@Setter
@Getter
@Jacksonized
@NoArgsConstructor
@AllArgsConstructor
public abstract class PageResponse<T> {
    protected List<T> data;
    protected Metadata metadata;


}
