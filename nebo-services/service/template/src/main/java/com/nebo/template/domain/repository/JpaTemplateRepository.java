package com.nebo.template.domain.repository;

import com.nebo.template.domain.model.Template;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface JpaTemplateRepository extends JpaRepository<Template, Long>, JpaSpecificationExecutor<Template> {
    Optional<Template> findById(Long aLong);

    Optional<Template> findTemplateByUserIdAndId(long userId, long id);

    List<Template> findAllByIdIn(List<Long> ids);

    List<Template> findAllByUserIdAndIdIn(long userId, List<Long> ids);
}