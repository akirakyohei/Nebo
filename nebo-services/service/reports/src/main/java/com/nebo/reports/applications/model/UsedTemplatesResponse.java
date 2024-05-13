package com.nebo.reports.applications.model;

import com.nebo.types.PageResponse;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class UsedTemplatesResponse extends PageResponse<UsedTemplateResponse> {
    private long aggregates;

    public UsedTemplatesResponse aggregates(long aggregates) {
        this.aggregates = aggregates;
        return this;
    }
}
