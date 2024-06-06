package com.nebo.reports.infrastructures.domain.repository;

import com.nebo.reports.applications.model.TimeRequest;
import com.nebo.reports.infrastructures.domain.dto.TopUsedPaperTypeDto;
import com.nebo.reports.infrastructures.domain.dto.UsedPaperTypeDto;
import com.nebo.reports.infrastructures.domain.rowmapper.TopUsedPaperTypeRowMapper;
import com.nebo.reports.infrastructures.domain.rowmapper.UsedPaperTypeRowMapper;
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
public class UsedPaperTypeRepositoryImpl implements UsedPaperTypeRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public List<TopUsedPaperTypeDto> getTopUsedPaperTypeDto(long userKey, long top, TimeRequest timeRequest) {

        String builder = "SELECT FU.paper_type_key,sum(FU.total_used) AS total_used FROM fact_used_paper_types FU " +
                "INNER JOIN dim_datetimes DD ON FU.date_key=DD.date_key " +
                "WHERE FU.user_key=:userKey AND " +
                "DD.date>=:startDate AND " +
                "DD.date<=:endDate " +
                "GROUP BY FU.paper_type_key " +
                "ORDER BY total_used DESC " +
                "limit :top";
        var parameterSource = new MapSqlParameterSource();
        parameterSource.addValue("userKey", userKey);
        parameterSource.addValue("startDate", DateTimeFormatter.ISO_DATE.format(timeRequest.getFromDate()));
        parameterSource.addValue("endDate", DateTimeFormatter.ISO_DATE.format(timeRequest.getToDate()));
        parameterSource.addValue("top", top);
        return namedParameterJdbcTemplate.query(builder, parameterSource, new TopUsedPaperTypeRowMapper());
    }

    @Override
    public Page<UsedPaperTypeDto> getUsedPaperTypes(long userKey, List<Integer> paperTypeKeys, TimeRequest timeRequest, PagingFilterRequest pagingFilterRequest) {
        var parameterSource = new MapSqlParameterSource();
        parameterSource.addValue("userKey", userKey);
        parameterSource.addValue("startDate", DateTimeFormatter.ISO_DATE.format(timeRequest.getFromDate()));
        parameterSource.addValue("endDate", DateTimeFormatter.ISO_DATE.format(timeRequest.getToDate()));
        parameterSource.addValue("offset", pagingFilterRequest.toPageable().getOffset());
        parameterSource.addValue("limit", pagingFilterRequest.getLimit());
        if (!CollectionUtils.isEmpty(paperTypeKeys))
            parameterSource.addValue("paperTypeKeys", StringUtils.join(paperTypeKeys, ","));
        var list = namedParameterJdbcTemplate.query(buildSqlUsedPaperType(paperTypeKeys, timeRequest.getUnit(), false), parameterSource, new UsedPaperTypeRowMapper());
        var total = namedParameterJdbcTemplate.queryForObject(buildSqlUsedPaperType(paperTypeKeys, timeRequest.getUnit(), true), parameterSource, (rs, rowNum) -> rs.getLong(0));
        return new PageImpl<>(list, pagingFilterRequest.toPageable(), total);
    }

    @Override
    public long aggregateUsedPaperTypes(long userKey, List<Integer> paperTypeKeys, TimeRequest timeRequest) {
        var builder = new StringBuilder("SELECT sum(FU.totalUsed) as totalUsed FROM fact_used_paper_types FU " +
                "INNER JOIN dim_datetimes DD ON FU.date_key=DD.date_key " +
                "WHERE FU.user_key=:userKey AND " +
                "DD.date>=:startDate AND " +
                "DD.date<=:endDate ");
        var parameterSource = new MapSqlParameterSource();
        parameterSource.addValue("userKey", userKey);
        parameterSource.addValue("startDate", DateTimeFormatter.ISO_DATE.format(timeRequest.getFromDate()));
        parameterSource.addValue("endDate", DateTimeFormatter.ISO_DATE.format(timeRequest.getToDate()));
        if (!CollectionUtils.isEmpty(paperTypeKeys)) {
            builder.append(" AND FU.paper_type_key in (:paperTypeKeys) ");
            parameterSource.addValue("paperTypeKeys", StringUtils.join(paperTypeKeys, ","));
        }
        return namedParameterJdbcTemplate.queryForObject(builder.toString(), parameterSource, (rs, rowNum) -> rs.getLong(0));
    }

    private String buildSqlUsedPaperType(List<Integer> paperTypeKeys, TimeRequest.Unit unit, boolean count) {
        var params = new ArrayList<String>();
        var builder = new StringBuilder("SELECT {0} FROM fact_used_paper_types FU " +
                "INNER JOIN dim_datetimes DD ON FU.date_key=DD.date_key " +
                "WHERE FU.user_key=:userKey AND " +
                "DD.date>=:startDate AND " +
                "DD.date<=:endDate "
        );
        if (!CollectionUtils.isEmpty(paperTypeKeys)) {
            builder.append(" AND FU.paper_type_key in (:paperTypeKeys) ");
        }
        builder.append("GROUP BY {1} ");
        if (count) {
            params.add("count(*)");

        } else {
            builder.append("ORDER BY {1} " +
                    "limit :offset,:limit");
            params.add("sum(FU.totalUsed) as totalUsed, DD." + buildUnit(unit));
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
