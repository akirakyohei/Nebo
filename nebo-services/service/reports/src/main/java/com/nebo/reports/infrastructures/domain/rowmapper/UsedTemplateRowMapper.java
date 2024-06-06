package com.nebo.reports.infrastructures.domain.rowmapper;

import com.nebo.reports.infrastructures.domain.dto.UsedTemplateDto;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UsedTemplateRowMapper implements RowMapper<UsedTemplateDto> {
    @Override
    public UsedTemplateDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        return UsedTemplateDto.builder()
                .totalUsed(rs.getLong(0))
                .date(rs.getDate(1).toInstant())
                .build();
    }
}
