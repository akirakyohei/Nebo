package com.nebo.reports.domain.rowmapper;

import com.nebo.reports.domain.dto.UsedPaperTypeDto;
import com.nebo.reports.infrastructures.utils.DateUtils;
import com.nebo.shared.common.utils.JsonUtils;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Instant;

public class UsedPaperTypeRowMapper implements RowMapper<UsedPaperTypeDto> {
    @Override
    public UsedPaperTypeDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        return UsedPaperTypeDto.builder()
                .totalUsed(rs.getLong(1))
                .date(DateUtils.parse(rs.getString(2)))
                .build();
    }
}
