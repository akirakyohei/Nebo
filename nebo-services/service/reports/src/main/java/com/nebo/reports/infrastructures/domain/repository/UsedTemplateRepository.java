package com.nebo.reports.infrastructures.domain.repository;

import com.nebo.reports.applications.model.TimeRequest;
import com.nebo.reports.infrastructures.domain.dto.TopUsedTemplateDto;
import com.nebo.reports.infrastructures.domain.dto.UsedTemplateDto;
import com.nebo.types.PagingFilterRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UsedTemplateRepository {
    List<TopUsedTemplateDto> getTopUsedTemplateDto(long userKey, long top, TimeRequest timeRequest);

    Page<UsedTemplateDto> getUsedTemplates(long userKey, List<Long> templateKeys, TimeRequest timeRequest, PagingFilterRequest pagingFilterRequest);

    long aggregateUsedTemplates(long userKey, List<Long> templateKeys, TimeRequest timeRequest);

}
