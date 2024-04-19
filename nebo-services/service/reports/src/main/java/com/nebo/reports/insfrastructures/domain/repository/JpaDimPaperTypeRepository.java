package com.nebo.reports.insfrastructures.domain.repository;

import com.nebo.reports.insfrastructures.domain.model.DimPaperType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaDimPaperTypeRepository extends JpaRepository<DimPaperType, Integer> {
    Optional<DimPaperType> findDimPaperTypeByPaperTypeId(int paperTypeId);
}
