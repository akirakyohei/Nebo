package com.nebo.reports.applications.model;

import com.nebo.types.PageResponse;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;


@Setter
@Getter
public class UsedTemplatesResponse extends PageResponse<UsedTemplateResponse> {
    private long aggregates;

    public UsedTemplatesResponse aggregates(long aggregates) {
        this.aggregates = aggregates;
        return this;
    }

    public UsedTemplatesResponse(Page<UsedTemplateResponse> page) {
        super(page);
    }
}
