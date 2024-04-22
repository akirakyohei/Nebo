package com.nebo.reports.applications.service;

import com.nebo.reports.applications.model.*;
import com.nebo.reports.applications.service.mapper.DimTemplateMapper;
import com.nebo.reports.applications.service.mapper.DimUserMapper;
import com.nebo.reports.applications.service.mapper.FactSessionMapper;
import com.nebo.reports.insfrastructures.domain.model.*;
import com.nebo.reports.insfrastructures.domain.repository.*;
import com.nebo.types.DebeziumOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class ETLReportServiceImpl implements ETLReportService {
    private final static ZoneOffset ZONE_VN = ZoneOffset.ofHours(7);
    private final JpaDimDateTimeRepository dimDateTimeRepository;
    private final JpaDimUserRepository dimUserRepository;
    private final JpaDimPaperTypeRepository dimPaperTypeRepository;
    private final JpaDimTemplateRepository dimTemplateRepository;
    private final JpaFactAggregateRepository factAggregateRepository;
    private final JpaFactUsedPaperTypeRepository factUsedPaperTypeRepository;
    private final JpaFactUsedTemplateRepository factUsedTemplateRepository;
    private final JpaFactSessionRepository factSessionRepository;
    private final FactSessionMapper factSessionMapper;
    private final DimTemplateMapper dimTemplateMapper;
    private final DimUserMapper dimUserMapper;

    @Override
    @Transactional
    public void loadUser(User user) {
        var dimUser = getDimUser(user.getId());
        Assert.notNull(dimUser, "dim user not null");
        dimUserMapper.updateUser(user, dimUser);
        dimUserRepository.save(dimUser);
    }

    @Override
    @Transactional
    public void loadTemplate(Template template, DebeziumOperation op) {
        var dimTemplate = getDimTemplate(template.getId());
        var dimPaperType = getDimPaperType(template.getPaperTypeId());
        var dimUser = getDimUser(template.getUserId());
        Assert.notNull(dimUser, "dim user not null");
        Assert.notNull(dimTemplate, "dim template not null");
        Assert.notNull(dimPaperType, "dim paper type not null");
        if (!DebeziumOperation.d.equals(op)) {
            dimTemplateMapper.updateTemplate(template, dimTemplate);
            dimTemplate.setPaperTypeKey(dimPaperType.getPaperTypeKey());
            dimTemplate.setUserKey(dimUser.getUserKey());
            dimTemplateRepository.save(dimTemplate);
        }
        if (DebeziumOperation.c.equals(op)) {
            var dimDate = getDimDateTime(template.getCreatedOn());
            Assert.notNull(dimDate, "dim date not null");
            var factUsedPaperType = getFactUsedPaperType(dimDate.getDateKey(), dimUser.getUserKey(), dimPaperType.getPaperTypeKey());
            Assert.notNull(factUsedPaperType, "fact used paper type not null");
            factUsedPaperTypeRepository.updateTotalUsedById(factUsedPaperType.getId(), 1);
        }
        if (List.of(DebeziumOperation.c, DebeziumOperation.d).contains(op)) {
            var factAggregate = getFactAggregate(dimUser.getUserKey());
            Assert.notNull(factAggregate, "fact aggregate not null");
            var delta = !DebeziumOperation.d.equals(op) ? 1 : -1;
            factAggregateRepository.updateTotalTemplateById(factAggregate.getId(), delta);
        }
    }

    @Override
    public void aggregateStorageData(StorageModel model) {
        var dimUser = getDimUser(model.getUserId());
        Assert.notNull(dimUser, "dim user not null");
        var factAggregate = getFactAggregate(dimUser.getUserKey());
        Assert.notNull(factAggregate, "fact aggregate not null");
        factAggregateRepository.updateTotalDataById(factAggregate.getId(), model.getAdjustTotalData());
    }

    @Override
    @Transactional
    public void loadUsedTemplate(PrintLog printLog) {
        var dimTemplate = getDimTemplate(printLog.getTemplateId());
        var dimUser = getDimUser(printLog.getUserId());
        var dimDate = getDimDateTime(printLog.getCreatedOn());
        Assert.notNull(dimDate, "dim date not null");
        Assert.notNull(dimUser, "dim user not null");
        Assert.notNull(dimTemplate, "dim template not null");
        var factUsedTemplate = getFactUsedTemplate(dimDate.getDateKey(), dimUser.getUserKey(), dimTemplate.getTemplateKey());
        Assert.notNull(factUsedTemplate, "fact used template not null");
        factUsedTemplateRepository.updateTotalUsedById(factUsedTemplate.getId(), 1);
    }

    @Override
    public void loadSession(Session session) {
        var dimUser = getDimUser(session.getUserId());
        Assert.notNull(dimUser, "dim user not null");
        var factSession = factSessionMapper.fromModelToDomain(session);
        factSession.setUserKey(dimUser.getUserKey());
    }

    private DimDatetime getDimDateTime(Instant date) {
        var localDate = LocalDateTime.ofInstant(date, ZoneId.of("Asia/Ho_Chi_Minh"))
                .withMinute(0)
                .withSecond(0)
                .withNano(0);
        var standardDate = localDate.toInstant(ZONE_VN);
        return dimDateTimeRepository.findDimDateTimeByDate(standardDate).orElseGet(() -> {
            try {
                var entity = DimDatetime.builder()
                        .date(standardDate)
                        .hour(localDate.getHour())
                        .dayOfWeek(localDate.getDayOfWeek().name().toLowerCase(Locale.ROOT))
                        .dayOfMonth(localDate.getDayOfMonth())
                        .dayOfYear(localDate.getDayOfYear())
                        .monthOfYear(localDate.getMonthValue())
                        .year(localDate.getYear())
                        .firstHourOfDay(localDate.withHour(0).toInstant(ZONE_VN))
                        .firstDayOfMonth(localDate.with(TemporalAdjusters.firstDayOfMonth()).withHour(0).toInstant(ZONE_VN))
                        .firstDayOfWeek(localDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY)).withHour(0).toInstant(ZONE_VN))
                        .firstDayOfYear(localDate.with(TemporalAdjusters.firstDayOfYear()).withHour(0).toInstant(ZONE_VN))
                        .build();
                return dimDateTimeRepository.save(entity);
            } catch (Exception ex) {
                return dimDateTimeRepository.findDimDateTimeByDate(standardDate).orElse(null);
            }
        });
    }

    private DimUser getDimUser(long userId) {
        return dimUserRepository.findDimUserByUserId(userId).orElseGet(() -> {
            try {
                var entity = DimUser.builder()
                        .userId(userId)
                        .build();
                return dimUserRepository.save(entity);
            } catch (Exception e) {
                return dimUserRepository.findDimUserByUserId(userId).orElse(null);
            }
        });
    }

    private DimPaperType getDimPaperType(int paperTypeId) {
        return dimPaperTypeRepository.findDimPaperTypeByPaperTypeId(paperTypeId).orElse(null);
    }

    private DimTemplate getDimTemplate(long templateId) {
        return dimTemplateRepository.findDimTemplateByTemplateId(templateId).orElseGet(() -> {
            try {
                var entity = DimTemplate.builder()
                        .templateId(templateId)
                        .build();
                return dimTemplateRepository.save(entity);
            } catch (Exception e) {
                return dimTemplateRepository.findDimTemplateByTemplateId(templateId).orElse(null);
            }
        });
    }

    private FactAggregate getFactAggregate(long userKey) {
        return factAggregateRepository.findFactAggregateByUserKey(userKey).orElseGet(() -> {
            try {
                var entity = new FactAggregate(userKey);
                return factAggregateRepository.save(entity);
            } catch (Exception e) {
                return factAggregateRepository.findFactAggregateByUserKey(userKey).orElse(null);
            }
        });
    }


    private FactUsedPaperType getFactUsedPaperType(long dateKey, long userKey, int paperTypeKey) {
        return factUsedPaperTypeRepository.findFactUsedPaperTypeByDateKeyAndUserKeyAndPaperTypeKey(dateKey, userKey, paperTypeKey).orElseGet(() -> {
            try {
                var entity = new FactUsedPaperType(userKey, dateKey, paperTypeKey);
                return factUsedPaperTypeRepository.save(entity);
            } catch (Exception e) {
                return factUsedPaperTypeRepository.findFactUsedPaperTypeByDateKeyAndUserKeyAndPaperTypeKey(dateKey, userKey, paperTypeKey).orElse(null);
            }
        });
    }

    private FactUsedTemplate getFactUsedTemplate(long dateKey, long userKey, long templateKey) {
        return factUsedTemplateRepository.findFactUsedTemplateByDateKeyAndUserKeyAndTemplateKey(dateKey, userKey, templateKey).orElseGet(() -> {
            try {
                var entity = new FactUsedTemplate(userKey, dateKey, templateKey);
                return factUsedTemplateRepository.save(entity);
            } catch (Exception e) {
                return factUsedTemplateRepository.findFactUsedTemplateByDateKeyAndUserKeyAndTemplateKey(dateKey, userKey, templateKey).orElse(null);
            }
        });
    }


}
