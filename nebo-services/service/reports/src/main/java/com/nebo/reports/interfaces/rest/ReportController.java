package com.nebo.reports.interfaces.rest;


import com.nebo.reports.applications.model.*;
import com.nebo.reports.applications.service.ReportService;
import com.nebo.types.PagingFilterRequest;
import com.nebo.web.applications.bind.UserId;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/sessions")
    HistorySessionsResponse getHistorySession(@UserId Long userId, HistorySessionFilterRequest request) {
        return reportService.getHistorySession(userId, request);
    }

    @GetMapping
    AggregateReportResponse getAggregateReport(@UserId Long userId) {
        return reportService.getAggregateReport(userId);
    }

    @GetMapping("/top_used_paper_type")
    List<TopUsedPaperTypeResponse> getTopUsedPaperTypeResponse(@UserId Long userId, long top, TimeRequest timeRequest) {
        return reportService.getTopUsedPaperTypeResponse(userId, top, timeRequest);
    }

    @GetMapping("/top_used_template")
    List<TopUsedTemplateResponse> getTopUsedTemplateResponse(@UserId Long userId, long top, TimeRequest timeRequest){
        return reportService.getTopUsedTemplateResponse(userId, top, timeRequest);
    }

    @GetMapping("/used_template")
    UsedTemplatesResponse getUsedTemplates(@UserId Long userId, List<Long> templateIds, TimeRequest timeRequest, PagingFilterRequest pagingFilterRequest){
        return reportService.getUsedTemplates(userId, templateIds, timeRequest, pagingFilterRequest);
    }

    @GetMapping("/used_paper_type")
    UsedPaperTypesResponse getUsedPaperTypes(@UserId Long userId, List<Integer> paperTypeIds, TimeRequest timeRequest, PagingFilterRequest pagingFilterRequest){
        return reportService.getUsedPaperTypes(userId, paperTypeIds, timeRequest, pagingFilterRequest);
    }


}
