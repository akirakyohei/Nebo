package com.nebo.template.infrastructures.domain.repository;

import com.nebo.template.infrastructures.domain.model.Template;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface JpaTemplateRepository extends JpaRepository<Template, Long>, JpaSpecificationExecutor<Template> {
    Optional<Template> findTemplateByUserIdAndId(long userId, long id);
}