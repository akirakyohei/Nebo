package com.nebo.reports.applications.model;

import com.nebo.shared.common.types.PageResponse;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;


@Setter
@Getter
public class UsedPaperTypesResponse extends PageResponse<UsedPaperTypeResponse> {
    private long aggregates;

    public UsedPaperTypesResponse aggregates(long aggregates) {
        this.aggregates = aggregates;
        return this;
    }

    public UsedPaperTypesResponse(Page<UsedPaperTypeResponse> page) {
        super(page);
    }
}
