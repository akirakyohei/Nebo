package com.nebo.reports.interfaces.rest;


import com.nebo.reports.applications.model.*;
import com.nebo.reports.applications.service.ReportService;
import com.nebo.shared.web.applications.bind.UserId;
import com.nebo.shared.common.types.PagingFilterRequest;
import com.nebo.shared.web.applications.exception.ConstraintViolationException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
        var res = reportService.getAggregateReport(userId);
        return res;
    }

    @GetMapping("/top_used_paper_type")
    List<TopUsedPaperTypeResponse> getTopUsedPaperTypeResponse(@UserId Long userId, @RequestParam(value = "top", defaultValue = "10") Long top, @Valid TimeRequest timeRequest) {
        var res = reportService.getTopUsedPaperTypeResponse(userId, top, timeRequest);
        return res;
    }

    @GetMapping("/top_used_template")
    List<TopUsedTemplateResponse> getTopUsedTemplateResponse(@UserId Long userId, @RequestParam(value = "top", defaultValue = "10") Long top, @Valid TimeRequest timeRequest) {
        return reportService.getTopUsedTemplateResponse(userId, top, timeRequest);
    }

    @GetMapping("/used_template")
    UsedTemplatesResponse getUsedTemplates(@UserId Long userId, @RequestParam(value = "template_ids", required = false) List<Long> templateIds, @Valid TimeRequest timeRequest) throws ConstraintViolationException {
        return reportService.getUsedTemplates(userId, templateIds, timeRequest);
    }

    @GetMapping("/used_paper_type")
    UsedPaperTypesResponse getUsedPaperTypes(@UserId Long userId, @RequestParam(value = "paper_type_ids", required = false) List<Integer> paperTypeIds, @Valid TimeRequest timeRequest) throws ConstraintViolationException {
        return reportService.getUsedPaperTypes(userId, paperTypeIds, timeRequest);
    }


}
