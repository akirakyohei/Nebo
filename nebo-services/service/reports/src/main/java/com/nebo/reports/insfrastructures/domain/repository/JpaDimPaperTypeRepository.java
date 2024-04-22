package com.nebo.reports.insfrastructures.domain.repository;

import com.nebo.reports.insfrastructures.domain.model.DimPaperType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaDimPaperTypeRepository extends JpaRepository<DimPaperType, Integer> {
    Optional<DimPaperType> findDimPaperTypeByPaperTypeId(int paperTypeId);

    List<DimPaperType> findAllByUserKeyAndPaperTypeIdIn(long userKey, List<Integer> paperTypeIds);
}
