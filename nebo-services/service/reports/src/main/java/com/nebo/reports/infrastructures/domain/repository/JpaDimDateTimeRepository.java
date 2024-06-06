package com.nebo.reports.infrastructures.domain.repository;

import com.nebo.reports.infrastructures.domain.model.DimDatetime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Optional;

public interface JpaDimDateTimeRepository extends JpaRepository<DimDatetime, Long> {

    Optional<DimDatetime> findDimDateTimeByDate(Instant date);
}
