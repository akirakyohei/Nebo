package com.nebo.reports.domain.rowmapper;

import com.nebo.reports.domain.dto.TopUsedTemplateDto;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TopUsedTemplateRowMapper implements RowMapper<TopUsedTemplateDto> {
    @Override
    public TopUsedTemplateDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        return TopUsedTemplateDto.builder()
                .templateKey(rs.getLong(1))
                .totalUsed(rs.getLong(2))
                .build();
    }
}
