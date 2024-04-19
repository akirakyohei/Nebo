package com.nebo.reports.insfrastructures.domain.repository;

import com.nebo.reports.insfrastructures.domain.model.DimDateTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Optional;

public interface JpaDimDateTimeRepository extends JpaRepository<DimDateTime, Long> {

    Optional<DimDateTime> findDimDateTimeByDate(Instant date);
}
