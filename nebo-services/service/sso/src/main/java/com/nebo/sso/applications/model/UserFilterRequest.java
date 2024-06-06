package com.nebo.sso.applications.model;


import com.nebo.types.PagingFilterRequest;
import com.nebo.web.applications.bind.SupportParamName;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@SupportParamName
public class UserFilterRequest extends PagingFilterRequest {
    private String query;
    private String ids;
}
