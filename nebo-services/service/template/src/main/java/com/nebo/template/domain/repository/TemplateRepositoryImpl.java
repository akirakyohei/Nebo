package com.nebo.template.domain.repository;

import com.nebo.template.applications.model.template.TemplateFilterRequest;
import com.nebo.template.domain.model.Template;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;


import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

@Repository
@RequiredArgsConstructor
public class TemplateRepositoryImpl implements TemplateRepository {

    @Qualifier("templateNamedParameterJdbcTemplate")
    private final NamedParameterJdbcTemplate parameterJdbcTemplate;

    private final JpaTemplateRepository jpaTemplateRepository;

    @Override
    public Page<Template> findAll(long userId, TemplateFilterRequest request) {

        if (request.getShared() == null || !request.getShared()) {
            return buildSqlWithoutShared(userId, request);
        } else {
            return buildSqlWithShared(userId, request);
        }
    }


    private Page<Template> buildSqlWithoutShared(long userId, TemplateFilterRequest request) {
        var parameterSource = new MapSqlParameterSource();

        var strQuery = new ArrayList<String>();
        strQuery.add(" T.user_id=:userId ");
        parameterSource.addValue("userId", userId);

        if (!CollectionUtils.isEmpty(request.getCategoryIds())) {
            strQuery.add("(" + buildFindInSetCategoryId(request.getCategoryIds()) + ")");
        }
        if (StringUtils.isNotBlank(request.getQuery())) {
            strQuery.add(" T.name LIKE '%:query%' ");
            parameterSource.addValue("query", request.getQuery());
        }
        if (!CollectionUtils.isEmpty(request.getCategoryIds())) {
            strQuery.add(" T.id in (:ids) ");
            parameterSource.addValue("ids", StringUtils.join(request.getIds(), ","));
        }

        if (request.getActive() != null) {
            if (request.getActive()) {
                strQuery.add(" T.active is true ");
            } else {
                strQuery.add(" T.active is false ");
            }
        }

        var whereBuilder = StringUtils.join(strQuery, " AND ");
        var orderBy = buildOrderBy(request);
        var limitOffset = buildLimitOffset(request, parameterSource);

        /// selection
        var sqlSelect = "Select T.id from templates as T  WHERE " +
                whereBuilder.toString() + orderBy + limitOffset;

        var templateIds = parameterJdbcTemplate.query(sqlSelect, parameterSource, (rs, rowNum) -> rs.getLong(1));

        var templates = jpaTemplateRepository.findAllByIdIn(templateIds);
        templates = templates.stream().sorted(Comparator.comparingInt(a -> templateIds.indexOf(a.getId()))).toList();

        /// count
        var sqlCount = "Select count(*) from templates as T  WHERE " +
                whereBuilder.toString();

        var total = parameterJdbcTemplate.queryForObject(sqlCount, parameterSource, Long.class);
        return new PageImpl<Template>(templates, request.toPageable(), total);
    }

    private Page<Template> buildSqlWithShared(long userId, TemplateFilterRequest request) {
        var parameterSource = new MapSqlParameterSource();

        parameterSource.addValue("userId", userId);
        var strQuery = new ArrayList<String>();
        if (!CollectionUtils.isEmpty(request.getCategoryIds())) {
            strQuery.add("(" + buildFindInSetCategoryId(request.getCategoryIds()) + ")");
        }
        if (StringUtils.isNotBlank(request.getQuery())) {
            strQuery.add(" T.name LIKE '%:query%' ");
            parameterSource.addValue("query", request.getQuery());
        }
        if (!CollectionUtils.isEmpty(request.getCategoryIds())) {
            strQuery.add(" T.id in (:ids) ");
            parameterSource.addValue("ids", StringUtils.join(request.getIds(), ","));
        }
        strQuery.add(" T.active is true ");

        var whereBuilder = StringUtils.join(strQuery, " AND ");
        if (StringUtils.isNotBlank(whereBuilder)) {
            whereBuilder = " WHERE " + whereBuilder;
        }
        var orderBy = buildOrderBy(request);
        var limitOffset = buildLimitOffset(request, parameterSource);

        /// selection
        var sqlSelect = "Select T.id FROM (" + buildFromShared() + ") AS T " +
                whereBuilder + orderBy + limitOffset;

        var templateIds = parameterJdbcTemplate.query(sqlSelect, parameterSource, (rs, rowNum) -> rs.getLong(1));

        var templates = jpaTemplateRepository.findAllByIdIn(templateIds);
        templates = templates.stream().sorted(Comparator.comparingInt(a -> templateIds.indexOf(a.getId()))).toList();

        /// count
        var sqlCount = "Select count(*) from (" + buildFromShared() + ") as T " +
                whereBuilder.toString();

        var total = parameterJdbcTemplate.queryForObject(sqlCount, parameterSource, Long.class);
        return new PageImpl<Template>(templates, request.toPageable(), total);


    }

    private String buildFromShared() {
        return "SELECT T2.* FROM templates T2 WHERE T2.user_id!=:userId AND T2.shared_status='allow_all' " +
                " UNION " +
                "SELECT T3.* FROM templates T3 JOIN user_permissions TP1 ON T3.id=TP1.template_id WHERE T3.user_id!=:userId AND TP1.shared_user_id=:userId AND TP1.permissions LIKE '%read%' ";
    }

    private String buildFindInSetCategoryId(List<Long> categoryIds) {
        return StringUtils.join(categoryIds.stream().map(categoryId ->
                " FIND_IN_SET(" + categoryId + ",T.category_ids) > 0 "
        ).toList(), " OR ");
    }

    private String buildOrderBy(TemplateFilterRequest request) {
        var sortDirection = Sort.Direction.DESC;
        if (request.getSortDirection() != null) {

            sortDirection = Sort.Direction.fromOptionalString(
                    request.getSortBy()
            ).orElse(Sort.Direction.DESC);
        }
        var sortBy = "created_at";
        if (request.getSortBy() != null) {
            sortBy = Stream.of("created_at", "updated_at", "name").map(a -> StringUtils.equals(a, request.getSortBy()) ? a : null)
                    .filter(Objects::nonNull).findFirst().orElse("created_at");
        }
        return " ORDER BY T." + sortBy + " " + sortDirection.name() + " ";
    }

    private String buildLimitOffset(TemplateFilterRequest request, MapSqlParameterSource mapSqlParameterSource) {
        var pageable = request.toPageable();
        mapSqlParameterSource.addValue("limit", pageable.getPageSize());
        mapSqlParameterSource.addValue("offset", pageable.getOffset());
        return " LIMIT :offset,:limit";
    }


}
