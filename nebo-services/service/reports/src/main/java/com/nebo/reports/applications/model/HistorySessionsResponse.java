package com.nebo.reports.applications.model;

import com.nebo.shared.common.types.PageResponse;
import org.springframework.data.domain.Page;

public class HistorySessionsResponse extends PageResponse<HistorySessionResponse> {
    public HistorySessionsResponse(Page<HistorySessionResponse> page) {
        super(page);
    }
}
