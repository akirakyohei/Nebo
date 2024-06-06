package com.nebo.reports.applications.service;

import com.nebo.lib.feignclient.client.B;
import com.nebo.lib.feignclient.client.NeboFeignClient;
import com.nebo.reports.applications.model.*;
import com.nebo.reports.applications.service.mapper.*;
import com.nebo.reports.infrastructures.domain.dto.TopUsedPaperTypeDto;
import com.nebo.reports.infrastructures.domain.dto.TopUsedTemplateDto;
import com.nebo.reports.infrastructures.domain.model.*;
import com.nebo.reports.infrastructures.domain.repository.*;
import com.nebo.reports.infrastructures.domain.specification.FactSessionSpecification;
import com.nebo.types.PagingFilterRequest;
import com.nebo.utils.Lists;
import com.nebo.web.applications.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final JpaFactSessionRepository factSessionRepository;
    private final JpaDimTemplateRepository dimTemplateRepository;
    private final JpaDimPaperTypeRepository dimPaperTypeRepository;
    private final JpaDimDateTimeRepository dimDateTimeRepository;
    private final JpaDimUserRepository dimUserRepository;
    private final JpaFactAggregateRepository factAggregateRepository;
    private final JpaFactUsedPaperTypeRepository factUsedPaperTypeRepository;
    private final JpaFactUsedTemplateRepository factUsedTemplateRepository;

    private final FactSessionMapper factSessionMapper;
    private final FactAggregateMapper factAggregateMapper;
    private final FactUsedPaperTypeMapper factUsedPaperTypeMapper;
    private final FactUsedTemplateMapper factUsedTemplateMapper;
    private final DimPaperTypeMapper paperTypeMapper;
    private final DimTemplateMapper templateMapper;
    private final NeboFeignClient neboFeignClient;

    @Override
    public HistorySessionsResponse getHistorySession(long userId, HistorySessionFilterRequest request) {
        var dimUser = getDimUserById(userId);
        var spec = FactSessionSpecification.toFilter(dimUser.getUserKey(), request);
        var page = factSessionRepository.findAll(spec, request.toPageable(Sort.by(Sort.Direction.DESC, FactSession_.CREATED_AT)));
        return new HistorySessionsResponse(page.map(factSessionMapper::fromDomainToResponse));
    }

    @Override
    public AggregateReportResponse getAggregateReport(long userId) {
        var dimUser = getDimUserById(userId);
        var aggregate = factAggregateRepository.findFactAggregateByUserKey(dimUser.getUserKey()).orElse(FactAggregate.getDefault(dimUser.getUserKey()));
        return factAggregateMapper.fromDomainToResponse(aggregate);
    }

    @Override
    public List<TopUsedPaperTypeResponse> getTopUsedPaperTypeResponse(long userId, long top, TimeRequest timeRequest) {
        var dimUser = getDimUserById(userId);
        var list = factUsedPaperTypeRepository.getTopUsedPaperTypeDto(dimUser.getUserKey(), top, timeRequest);
        return dimPaperTypeRepository.findAll()
                .stream()
                .map(paperType -> {
                    var totalUsed = list.stream()
                            .filter(item -> Objects.equals(item.getPaperTypeKey(), paperType.getPaperTypeKey())).findFirst()
                            .map(TopUsedPaperTypeDto::getTotalUsed)
                            .orElse(0L);
                    return TopUsedPaperTypeResponse.builder()
                            .totalUsed(totalUsed)
                            .paperType(paperTypeMapper.fromDomainToResponse(paperType))
                            .build();
                }).sorted(Comparator.comparingLong(TopUsedPaperTypeResponse::getTotalUsed))
                .limit(top)
                .toList();
    }

    @Override
    public List<TopUsedTemplateResponse> getTopUsedTemplateResponse(long userId, long top, TimeRequest timeRequest) {
        var dimUser = getDimUserById(userId);
        var list = factUsedTemplateRepository.getTopUsedTemplateDto(dimUser.getUserKey(), top, timeRequest);
        var templateKeys = list.stream().map(TopUsedTemplateDto::getTemplateKey).toList();

        var templates = dimTemplateRepository.findAllByTemplateKeyInAndUserKey(templateKeys, dimUser.getUserKey());
        if (templates.size() < top) {
            var expandTemplates = dimTemplateRepository.findAllByTemplateKeyNotInAndUserKey(templateKeys, dimUser.getUserKey(), PageRequest.of(0, (int) (top - templates.size()))).getContent();
            templates = Lists.join(templates, expandTemplates);
        }
        return templates.stream().map(template -> {
                    var totalUsed = list.stream()
                            .filter(item -> Objects.equals(item.getTemplateKey(), template.getTemplateKey())).findFirst()
                            .map(TopUsedTemplateDto::getTotalUsed)
                            .orElse(0L);
                    return TopUsedTemplateResponse.builder()
                            .totalUsed(totalUsed)
                            .template(templateMapper.fromDomainToResponse(template))
                            .build();
                }).sorted(Comparator.comparingLong(TopUsedTemplateResponse::getTotalUsed))
                .toList();
    }

    @Override
    public UsedTemplatesResponse getUsedTemplates(long userId, List<Long> templateIds, TimeRequest timeRequest, PagingFilterRequest pagingFilterRequest) {
        var dimUser = getDimUserById(userId);
        var templateKeys = !CollectionUtils.isEmpty(templateIds) ? dimTemplateRepository.findAllByUserKeyAndTemplateIdIn(dimUser.getUserKey(), templateIds).stream().map(DimTemplate::getTemplateKey).toList() : null;
        var page = factUsedTemplateRepository.getUsedTemplates(dimUser.getUserKey(), templateKeys, timeRequest, pagingFilterRequest);
        var aggregate = factUsedTemplateRepository.aggregateUsedTemplates(dimUser.getUserKey(), templateKeys, timeRequest);
        return (new UsedTemplatesResponse(page.map(factUsedTemplateMapper::fromDtoToResponse))).aggregates(aggregate);
    }

    @Override
    public UsedPaperTypesResponse getUsedPaperTypes(long userId, List<Integer> paperTypeIds, TimeRequest timeRequest, PagingFilterRequest pagingFilterRequest) {
        var dimUser = getDimUserById(userId);
        var paperTypeKeys = !CollectionUtils.isEmpty(paperTypeIds) ? dimPaperTypeRepository.findAllByPaperTypeIdIn(paperTypeIds)
                .stream().map(DimPaperType::getPaperTypeKey).toList() : null;
        var page = factUsedPaperTypeRepository.getUsedPaperTypes(dimUser.getUserKey(), paperTypeKeys, timeRequest, pagingFilterRequest);
        var aggregate = factUsedPaperTypeRepository.aggregateUsedPaperTypes(dimUser.getUserKey(), paperTypeKeys, timeRequest);
        return (new UsedPaperTypesResponse(page.map(factUsedPaperTypeMapper::fromDtoToResponse))).aggregates(aggregate);
    }

    private DimUser getDimUserById(long userId) {
        var dimUser = dimUserRepository.findDimUserByUserId(userId).orElse(null);
        if (dimUser != null)
            return dimUser;
        try {
            var user = neboFeignClient.getUserById(userId, B.withUserId(userId)).getUser();
            dimUser = new DimUser(userId, user.getFirstName(), user.getLastName(), user.getAvatarUrl());
            try {
                dimUserRepository.save(dimUser);
            } catch (Exception ex) {
            }
            return dimUser;
        } catch (Exception ex) {
        }
        throw new NotFoundException();
    }
}
