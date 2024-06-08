package com.nebo.reports.domain.repository;

import com.nebo.reports.domain.model.DimTemplate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaDimTemplateRepository extends JpaRepository<DimTemplate, Long> {
    Optional<DimTemplate> findDimTemplateByTemplateId(long templateId);

    List<DimTemplate> findAllByUserKeyAndTemplateIdIn(long userKey, List<Long> templateIds);

    List<DimTemplate> findAllByTemplateKeyInAndUserKey(List<Long> templateKeys, long userKey);

    Page<DimTemplate> findAllByTemplateKeyNotInAndUserKey(List<Long> templateKeys, long userKey, Pageable pageable);
}
