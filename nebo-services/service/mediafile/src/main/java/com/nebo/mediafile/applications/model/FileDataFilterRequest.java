package com.nebo.mediafile.applications.model;

import com.nebo.types.PagingFilterRequest;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FileDataFilterRequest extends PagingFilterRequest {

    private String query;
}
