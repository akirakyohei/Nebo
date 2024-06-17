package com.nebo.reports.applications.service;

import com.nebo.reports.applications.model.*;
import com.nebo.shared.web.applications.exception.ConstraintViolationException;

import java.util.List;

public interface ReportService {

    HistorySessionsResponse getHistorySession(long userId, HistorySessionFilterRequest request);

    AggregateReportResponse getAggregateReport(long userId);

    List<TopUsedPaperTypeResponse> getTopUsedPaperTypeResponse(long userId, long top, TimeRequest timeRequest);

    List<TopUsedTemplateResponse> getTopUsedTemplateResponse(long userId, long top, TimeRequest timeRequest);

    UsedTemplatesResponse getUsedTemplates(long userId, List<Long> templateId, TimeRequest timeRequest) throws ConstraintViolationException;

    UsedPaperTypesResponse getUsedPaperTypes(long userId, List<Integer> paperTypeId, TimeRequest timeRequest) throws ConstraintViolationException;
}
