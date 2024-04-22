package com.nebo.reports.insfrastructures.domain.repository;

import com.nebo.reports.insfrastructures.domain.model.FactUsedTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface JpaFactUsedTemplateRepository extends JpaRepository<FactUsedTemplate, Long>, UsedTemplateRepository {
    Optional<FactUsedTemplate> findFactUsedTemplateByDateKeyAndUserKeyAndTemplateKey(long dateKey, long userKey, long templateKey);

    @Modifying
    @Query("UPDATE FactUsedTemplate  SET totalUsed=totalUsed+:delta WHERE id =:id ")
    int updateTotalUsedById(@Param("id") long id, @Param("delta") long delta);
}
