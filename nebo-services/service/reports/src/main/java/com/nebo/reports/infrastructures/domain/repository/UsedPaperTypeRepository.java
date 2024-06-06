package com.nebo.reports.infrastructures.domain.repository;

import com.nebo.reports.applications.model.TimeRequest;
import com.nebo.reports.infrastructures.domain.dto.TopUsedPaperTypeDto;
import com.nebo.reports.infrastructures.domain.dto.UsedPaperTypeDto;
import com.nebo.types.PagingFilterRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UsedPaperTypeRepository {
    List<TopUsedPaperTypeDto> getTopUsedPaperTypeDto(long userKey, long top, TimeRequest timeRequest);

    Page<UsedPaperTypeDto> getUsedPaperTypes(long userKey, List<Integer> paperTypeKeys, TimeRequest timeRequest, PagingFilterRequest pagingFilterRequest);

    long aggregateUsedPaperTypes(long userKey, List<Integer> paperTypeKeys, TimeRequest timeRequest);

}
