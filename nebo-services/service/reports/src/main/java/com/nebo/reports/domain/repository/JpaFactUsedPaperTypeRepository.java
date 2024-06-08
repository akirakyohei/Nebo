package com.nebo.reports.domain.repository;

import com.nebo.reports.domain.model.FactUsedPaperType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface JpaFactUsedPaperTypeRepository extends JpaRepository<FactUsedPaperType, Long>, UsedPaperTypeRepository {
    Optional<FactUsedPaperType> findFactUsedPaperTypeByDateKeyAndUserKeyAndPaperTypeKey(long dateKey, long userKey, int paperKey);

    @Modifying
    @Query("UPDATE FactUsedPaperType  SET totalUsed=totalUsed+:delta WHERE id =:id ")
    int updateTotalUsedById(@Param("id") long id, @Param("delta") long delta);
}
