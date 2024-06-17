package com.nebo.sso.applications.model;


import com.nebo.shared.web.applications.bind.SupportParamName;
import com.nebo.shared.common.types.PagingFilterRequest;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@SupportParamName
public class UserFilterRequest extends PagingFilterRequest {
    private String query;
    private List<Long> ids;
}
