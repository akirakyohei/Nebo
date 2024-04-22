package com.nebo.reports.applications.model;

import com.nebo.types.PageResponse;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class UsedPaperTypesResponse extends PageResponse<UsedPaperTypeResponse> {
    private long aggregates;

    public UsedPaperTypesResponse aggregates(long aggregates) {
        this.aggregates = aggregates;
        return this;
    }
}
