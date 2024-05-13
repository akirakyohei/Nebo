package com.nebo.reports.insfrastructures.domain.rowmapper;

import com.nebo.reports.applications.model.TopUsedPaperTypeResponse;
import com.nebo.reports.insfrastructures.domain.dto.TopUsedPaperTypeDto;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TopUsedPaperTypeRowMapper implements RowMapper<TopUsedPaperTypeDto> {
    @Override
    public TopUsedPaperTypeDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        return TopUsedPaperTypeDto.builder()
                .paperTypeKey(rs.getInt(0))
                .totalUsed(rs.getLong(1))
                .build();
    }
}
