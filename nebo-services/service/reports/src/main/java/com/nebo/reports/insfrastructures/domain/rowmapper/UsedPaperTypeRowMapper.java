package com.nebo.reports.insfrastructures.domain.rowmapper;

import com.nebo.reports.insfrastructures.domain.dto.UsedPaperTypeDto;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UsedPaperTypeRowMapper implements RowMapper<UsedPaperTypeDto> {
    @Override
    public UsedPaperTypeDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        return UsedPaperTypeDto.builder()
                .totalUsed(rs.getLong(0))
                .date(rs.getDate(1).toInstant())
                .build();
    }
}
