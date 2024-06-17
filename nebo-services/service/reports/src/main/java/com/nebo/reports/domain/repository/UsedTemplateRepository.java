package com.nebo.reports.domain.repository;

import com.nebo.reports.applications.model.TimeRequest;
import com.nebo.reports.domain.dto.TopUsedTemplateDto;
import com.nebo.reports.domain.dto.UsedTemplateDto;
import com.nebo.shared.common.types.PagingFilterRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UsedTemplateRepository {
    List<TopUsedTemplateDto> getTopUsedTemplateDto(long userKey, long top, TimeRequest timeRequest);

    Page<UsedTemplateDto> getUsedTemplates(long userKey, List<Long> templateKeys, TimeRequest timeRequest, Pageable pageable);

    long aggregateUsedTemplates(long userKey, List<Long> templateKeys, TimeRequest timeRequest);

}
