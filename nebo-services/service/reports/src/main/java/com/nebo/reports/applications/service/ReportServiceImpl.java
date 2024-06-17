package com.nebo.reports.applications.service;

import com.nebo.lib.feignclient.client.B;
import com.nebo.lib.feignclient.client.NeboFeignClient;
import com.nebo.reports.applications.model.*;
import com.nebo.reports.applications.service.mapper.*;
import com.nebo.reports.domain.model.*;
import com.nebo.reports.domain.dto.TopUsedTemplateDto;
import com.nebo.reports.domain.dto.TopUsedPaperTypeDto;
import com.nebo.reports.domain.repository.*;
import com.nebo.reports.domain.specification.FactSessionSpecification;
import com.nebo.shared.common.utils.Lists;
import com.nebo.shared.web.applications.exception.ConstraintViolationException;
import com.nebo.shared.web.applications.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

import static com.nebo.reports.infrastructures.utils.DateUtils.zoneIdVn;
import static com.nebo.reports.infrastructures.utils.DateUtils.zoneOffsetVn;

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
                }).sorted((a, b) -> Long.compare(b.getTotalUsed(), a.getTotalUsed()))
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
                }).sorted((a, b) -> Long.compare(b.getTotalUsed(), a.getTotalUsed()))
                .toList();
    }

    @Override
    public UsedTemplatesResponse getUsedTemplates(long userId, List<Long> templateIds, TimeRequest timeRequest) throws ConstraintViolationException {
        var dimUser = getDimUserById(userId);
        var templateKeys = !CollectionUtils.isEmpty(templateIds) ? dimTemplateRepository.findAllByUserKeyAndTemplateIdIn(dimUser.getUserKey(), templateIds).stream().map(DimTemplate::getTemplateKey).toList() : null;
        var page = factUsedTemplateRepository.getUsedTemplates(dimUser.getUserKey(), templateKeys, timeRequest, PageRequest.of(0, 5000));
        var models = page.get().map(factUsedTemplateMapper::fromDtoToResponse).toList();
        var totalElements = getTotalElements(timeRequest.getFromDate(), timeRequest.getToDate(), timeRequest.getUnit());
        var aggregate = factUsedTemplateRepository.aggregateUsedTemplates(dimUser.getUserKey(), templateKeys, timeRequest);
        var chronoUnit = ChronoUnit.DAYS;
        switch (timeRequest.getUnit()) {
            case year:
                chronoUnit = ChronoUnit.YEARS;
                break;
            case month:
                chronoUnit = ChronoUnit.MONTHS;
                break;
            case day:
                chronoUnit = ChronoUnit.DAYS;
                break;
            case hour:
                chronoUnit = ChronoUnit.HOURS;
                break;
        }
        var localFromDate = LocalDateTime.ofInstant(timeRequest.getFromDate(), zoneIdVn);
        var result = new ArrayList<UsedTemplateResponse>();
        for (int i = 0; i < totalElements; i++) {
            var date = localFromDate.plus(i, chronoUnit).toInstant(zoneOffsetVn);
            var model = models.stream().filter(a -> a.getDate().compareTo(date) == 0).findFirst().orElse(null);
            result.add(model != null ? model : new UsedTemplateResponse(0, date));
        }
        return UsedTemplatesResponse.builder()
                .data(result)
                .aggregates(aggregate)
                .totalElement(totalElements)
                .build();
    }

    @Override
    public UsedPaperTypesResponse getUsedPaperTypes(long userId, List<Integer> paperTypeIds, TimeRequest timeRequest) throws ConstraintViolationException {
        var dimUser = getDimUserById(userId);
        var paperTypeKeys = !CollectionUtils.isEmpty(paperTypeIds) ? dimPaperTypeRepository.findAllByPaperTypeIdIn(paperTypeIds)
                .stream().map(DimPaperType::getPaperTypeKey).toList() : null;
        var page = factUsedPaperTypeRepository.getUsedPaperTypes(dimUser.getUserKey(), paperTypeKeys, timeRequest, PageRequest.of(0, 5000));
        var models = page.get().map(factUsedPaperTypeMapper::fromDtoToResponse).toList();
        var totalElements = getTotalElements(timeRequest.getFromDate(), timeRequest.getToDate(), timeRequest.getUnit());
        var aggregate = factUsedPaperTypeRepository.aggregateUsedPaperTypes(dimUser.getUserKey(), paperTypeKeys, timeRequest);
        var chronoUnit = ChronoUnit.DAYS;
        switch (timeRequest.getUnit()) {
            case year:
                chronoUnit = ChronoUnit.YEARS;
                break;
            case month:
                chronoUnit = ChronoUnit.MONTHS;
                break;
            case day:
                chronoUnit = ChronoUnit.DAYS;
                break;
            case hour:
                chronoUnit = ChronoUnit.HOURS;
                break;
        }
        var localFromDate = LocalDateTime.ofInstant(timeRequest.getFromDate(), zoneIdVn);
        var result = new ArrayList<UsedPaperTypeResponse>();
        for (int i = 0; i < totalElements; i++) {
            var date = localFromDate.plus(i, chronoUnit).toInstant(zoneOffsetVn);
            var model = models.stream().filter(a -> a.getDate().compareTo(date) == 0).findFirst().orElse(null);
            result.add(model != null ? model : new UsedPaperTypeResponse(0, date));
        }
        return UsedPaperTypesResponse.builder()
                .data(result)
                .totalElement(totalElements)
                .aggregates(aggregate)
                .build();
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

    private long getTotalElements(Instant fromDate, Instant toDate, TimeRequest.Unit unit) throws ConstraintViolationException {
        var localFromDate = LocalDateTime.ofInstant(fromDate, zoneIdVn);
        var localToDate = LocalDateTime.ofInstant(toDate, zoneIdVn);
        switch (unit) {
            case year:
                return Long.valueOf(ChronoUnit.YEARS.between(localFromDate, localToDate)).intValue() + 1;
            case month:
                return Long.valueOf(ChronoUnit.MONTHS.between(localFromDate, localToDate)).intValue() + 1;
            case day:
                return Long.valueOf(ChronoUnit.DAYS.between(localFromDate, localToDate)).intValue() + 1;
            case hour:
                return Long.valueOf(ChronoUnit.HOURS.between(localFromDate, localToDate)).intValue() + 1;
            default:
                throw new ConstraintViolationException("unit", "Not support");

        }
    }
}
