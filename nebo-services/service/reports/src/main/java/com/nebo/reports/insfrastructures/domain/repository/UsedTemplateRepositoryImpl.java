package com.nebo.reports.insfrastructures.domain.repository;

import com.nebo.reports.applications.model.TimeRequest;
import com.nebo.reports.insfrastructures.domain.dto.TopUsedTemplateDto;
import com.nebo.reports.insfrastructures.domain.dto.UsedTemplateDto;
import com.nebo.reports.insfrastructures.domain.rowmapper.TopUsedTemplateRowMapper;
import com.nebo.reports.insfrastructures.domain.rowmapper.UsedPaperTypeRowMapper;
import com.nebo.types.PagingFilterRequest;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import java.text.MessageFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UsedTemplateRepositoryImpl implements UsedTemplateRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public List<TopUsedTemplateDto> getTopUsedTemplateDto(long userKey, long top, TimeRequest timeRequest) {
        String builder = "SELECT FT.template_key,sum(FT.total_used) AS total_used FROM fact_used_templates FT " +
                "INNER JOIN dim_datetimes DD ON FT.date_key=DD.date_key " +
                "WHERE FT.user_key=:userKey AND " +
                "DD.date>=:startDate AND " +
                "DD.date<=:endDate " +
                "GROUP BY FT.template_key " +
                "ORDER BY total_used DESC " +
                "limit :top";
        var parameterSource = new MapSqlParameterSource();
        parameterSource.addValue("userKey", userKey);
        parameterSource.addValue("startDate", DateTimeFormatter.ISO_DATE.format(timeRequest.getFromDate()));
        parameterSource.addValue("endDate", DateTimeFormatter.ISO_DATE.format(timeRequest.getToDate()));
        parameterSource.addValue("top", top);
        return namedParameterJdbcTemplate.query(builder, parameterSource, new TopUsedTemplateRowMapper());
    }

    @Override
    public Page<UsedTemplateDto> getUsedTemplates(long userKey, List<Long> templateKeys, TimeRequest timeRequest, PagingFilterRequest pagingFilterRequest) {
        var parameterSource = new MapSqlParameterSource();
        parameterSource.addValue("userKey", userKey);
        parameterSource.addValue("startDate", DateTimeFormatter.ISO_DATE.format(timeRequest.getFromDate()));
        parameterSource.addValue("endDate", DateTimeFormatter.ISO_DATE.format(timeRequest.getToDate()));
        parameterSource.addValue("offset", pagingFilterRequest.toPageable().getOffset());
        parameterSource.addValue("limit", pagingFilterRequest.getLimit());
        if (!CollectionUtils.isEmpty(templateKeys)) {
            parameterSource.addValue("templateKeys", StringUtils.join(templateKeys, ","));
        }
        var list = namedParameterJdbcTemplate.query(buildSqlUsedTemplate(templateKeys, timeRequest.getUnit(), false), parameterSource, new UsedPaperTypeRowMapper());
        var total = namedParameterJdbcTemplate.queryForObject(buildSqlUsedTemplate(templateKeys, timeRequest.getUnit(), true), parameterSource, (rs, rowNum) -> rs.getLong(0));
        return new PageImpl(list, pagingFilterRequest.toPageable(), total);
    }

    @Override
    public long aggregateUsedTemplates(long userKey, List<Long> templateKeys, TimeRequest timeRequest) {
        var builder = new StringBuilder("SELECT sum(FT.totalUsed) as totalUsed FROM fact_used_templates FT " +
                "INNER JOIN dim_datetimes DD ON FT.date_key=DD.date_key " +
                "WHERE FT.user_key=:userKey AND " +
                "DD.date>=:startDate AND " +
                "DD.date<=:endDate ");
        var parameterSource = new MapSqlParameterSource();
        parameterSource.addValue("userKey", userKey);
        parameterSource.addValue("startDate", DateTimeFormatter.ISO_DATE.format(timeRequest.getFromDate()));
        parameterSource.addValue("endDate", DateTimeFormatter.ISO_DATE.format(timeRequest.getToDate()));
        if (!CollectionUtils.isEmpty(templateKeys)) {
            builder.append(" AND FT.template_key in (:templateKeys) ");
            parameterSource.addValue("templateKeys", StringUtils.join(templateKeys, ","));
        }
        return namedParameterJdbcTemplate.queryForObject(builder.toString(), parameterSource, (rs, rowNum) -> rs.getLong(0));

    }

    private String buildSqlUsedTemplate(List<Long> templateKeys, TimeRequest.Unit unit, boolean count) {
        var params = new ArrayList<String>();
        var builder = new StringBuilder("SELECT {0} FROM fact_used_templates FT " +
                "INNER JOIN dim_datetimes DD ON FT.date_key=DD.date_key " +
                "WHERE FT.user_key=:userKey AND " +
                "DD.date>=:startDate AND " +
                "DD.date<=:endDate "
        );
        if (!CollectionUtils.isEmpty(templateKeys)) {
            builder.append(" AND FT.template_key in (:tempkateKeys) ");
        }
        builder.append("GROUP BY {1} ");
        if (count) {
            params.add("count(*)");
            params.add("DD." + buildUnit(unit));

        } else {
            builder.append("ORDER BY {2} " +
                    "limit :offset,:limit");
            params.add("sum(FT.totalUsed) as totalUsed, DD." + buildUnit(unit));
            params.add("DD." + buildUnit(unit));
            params.add("DD." + buildUnit(unit) + " ASC");
        }
        return MessageFormat.format(builder.toString(), params.toArray(new Object[0]));
    }

    private String buildUnit(TimeRequest.Unit unit) {
        return switch (unit) {
            case hour -> "date";
            case day -> "first_hour_of_day";
            case month -> "first_day_of_month";
            case year -> "first_day_of_year";
        };
    }
}
