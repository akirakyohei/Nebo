package com.nebo.reports.insfrastructures.domain.repository;

import com.nebo.reports.insfrastructures.domain.model.DimTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaDimTemplateRepository extends JpaRepository<DimTemplate, Long> {
    Optional<DimTemplate> findDimTemplateByTemplateId(long templateId);
}
