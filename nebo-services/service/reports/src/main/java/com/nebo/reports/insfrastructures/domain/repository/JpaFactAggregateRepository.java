package com.nebo.reports.insfrastructures.domain.repository;

import com.nebo.reports.insfrastructures.domain.model.FactAggregate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface JpaFactAggregateRepository extends JpaRepository<FactAggregate, Long> {

    Optional<FactAggregate> findFactAggregateByUserKey(long userKey);

    @Modifying
    @Query("UPDATE FactAggregate SET totalData=totalData+:delta WHERE id=:id")
    int updateTotalDataById(@Param("id") long id, @Param("delta") long delta);

    @Modifying
    @Query("UPDATE FactAggregate SET totalTemplate=totalTemplate+:delta WHERE id=:id")
    int updateTotalTemplateById(@Param("id") long id, @Param("delta") long delta);

    @Modifying
    @Query("UPDATE FactAggregate SET totalUsedTemplate=totalUsedTemplate+:delta WHERE id=:id")
    int updateTotalUsedTemplateById(@Param("id") long id, @Param("delta") long delta);
}
